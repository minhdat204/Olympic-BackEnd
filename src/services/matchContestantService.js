const {
  Question,
  Match,
  Contestant,
  MatchContestant,
  Group,
  Answer,
} = require("../models");
const {
  emitTotalContestants,
  emitContestants,
  emitContestantsjudge_id,
} = require("../socketEmitters/contestantEmitter");
const { Op, Sequelize, where } = require("sequelize");

class MatchContestantService {
  constructor() {}

  // Tạo trận đấu mới
  async createMatchContestants(data) {
    return await MatchContestant.create(data);
  }

  // Lấy danh sách các trận đấu
  async getMatchContestants() {
    return await MatchContestant.findAll({
      include: [
        {
          model: Contestant,
          as: "contestant",
          attributes: ["fullname", "group_id"],
          raw: true,
          include: [
            {
              model: Group,
              as: "group",
              attributes: ["group_name"],
            },
          ],
        },
        { model: Match, as: "match", attributes: ["match_name"], raw: true },
      ],
    });
  }

  // Chi tiết trận đấu
  async getMatchContestant(id) {
    return await MatchContestant.findByPk(id);
  }

  // Cập nhật trạng thái trận đấu
  async updateMatchContestants(id, data) {
    const match = await MatchContestant.findByPk(id);
    if (!match) throw new Error("Không tìm thấy trận đấu");
    match.set(data);
    await match.save();
    return match;
  }
// Cập nhật trạng thái thí sinh thủ công của admin
  async updateStatus(id, status, eliminated_at_question_order) {
    try {
      let sts;
      if (status === "Đang thi") {
        eliminated_at_question_order = null;
      }
      const result = await MatchContestant.update(
        {
          status: status,
          eliminated_at_question_order: eliminated_at_question_order,
        },
        {
          where: { registration_number: id },
        }
      );

      if (result[0] > 0) {
        console.log(`✅ Đã cập nhật trạng thái cho thí sinh ${id}`);
      } else {
        console.log(`⚠️ Không tìm thấy thí sinh có số báo danh ${id}`);
      }
    } catch (error) {
      console.error(`❌ Lỗi cập nhật thí sinh:`, error);
    }
  }

  // Xóa trận đấu
  async deleteMatchContestant(id) {
    const match = await MatchContestant.findByPk(id);
    return await match.destroy();
  }

  // Lấy danh sách trạng thái
  async getListStatus() {
    return Object.values(MatchContestant.getAttributes().status.values);
  }

  // Lấy danh sách thí sinh theo trận đấu
  async getListContestantsByMatch(matches) {
    return await MatchContestant.findAll({
      where: { match_id: { [Op.in]: matches }, status: "Qua vòng" },
      limit: 40,
      order: Sequelize.literal("RAND()"),
      raw: true,
    });
  }

  // Cập nhật nhóm thí sinh trong trận đấu
  async updateContestantGroupByMatch(match_id, matches) {
    const groups = await Group.findAll({
      attributes: ["id"],
      where: { match_id },
      raw: true,
    });

    if (groups.length <= 0)
      return { message: "Trận đấu hiện tại chưa có nhóm" };

    console.log(groups);
    const contestants = await this.getListContestantsByMatch(matches);

    if (contestants.length <= 0)
      return { message: "Không có thí sinh để chia" };

    console.log(contestants.length, contestants);
    const k = Math.floor(contestants.length / groups.length);
    const r = contestants.length % groups.length;
    let index = 0;

    for (let i = 0; i < contestants.length; i++) {
      await Contestant.update(
        { group_id: groups[index].id },
        { where: { id: contestants[i].contestant_id } }
      );

      await MatchContestant.create({
        registration_number: i + 1,
        status: "Đang thi",
        match_id,
        contestant_id: contestants[i].contestant_id,
      });

      let maxgroup = k + (index < r ? 1 : 0);
      if ((i + 1) % maxgroup === 0) {
        index++;
      }
    }

    return {
      message: `Thêm ${contestants.length} thí sinh vào trận thành công`,
    };
  }

  // Xóa kết quả chia nhóm
  async deleteDividedGroup(match_id) {
    // Kiểm tra match_id có hợp lệ không
    if (!match_id || isNaN(match_id)) {
      throw new Error("match_id phải là một số hợp lệ");
    }

    // Xóa tất cả các dòng trong bảng match_contestants có match_id tương ứng
    const result = await MatchContestant.destroy({
      where: { match_id: parseInt(match_id) },
    });

    // Nếu không có dòng nào bị xóa, trả về thông báo
    if (result === 0) {
      throw new Error(
        "Không tìm thấy dữ liệu để xóa trong bảng match_contestants"
      );
    }

    // Đặt lại group_id của các thí sinh liên quan thành NULL
    await Contestant.update(
      { group_id: null },
      {
        where: {
          group_id: {
            [Op.in]: Sequelize.literal(
              `(SELECT id FROM groups WHERE match_id = ${parseInt(match_id)})`
            ),
          },
        },
      }
    );

    return result;
  }

  // Kiểm tra xem trận đấu đã được chia nhóm hay chưa
  async checkDivided(match_id) {
    if (!match_id || isNaN(match_id)) {
      throw new Error("match_id phải là một số hợp lệ");
    }

    const count = await MatchContestant.count({
      where: { match_id: parseInt(match_id) },
    });

    return count > 0; // Trả về true nếu có ít nhất 1 dòng, false nếu không có
  }

  // Lấy trạng thái của sinh viên ở hiện tại theo trận
  async getListContestantStatusByMatch(match_id, status) {
    return MatchContestant.findAll({
      attributes: ["contestant_id"],
      where: { match_id: match_id, status: status },
    });
  }
  async updateContestantGroupByMatchLoai(match_id, question_order) {
    return MatchContestant.update(
      { status: "Bị loại", eliminated_at_question_order: question_order },
      { where: { match_id: match_id, status: "Xác nhận 2" } }
    );
  }
  // Long dem so thi sinh xac nhan 1 va xac nhan 2
  //   async countContestantsByStatus(match_id) {
  //     return MatchContestant.count({
  //       where: { status: { Sequeliz } },
  //     });
  //   }
}

// Xuất class để có thể sử dụng lại nhiều nơi
module.exports = new MatchContestantService();

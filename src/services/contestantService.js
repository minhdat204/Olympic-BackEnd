const {
  Contestant,
  Group,
  Score_log,
  Answer,
  Match,
  User,
  MatchContestant,
} = require("../models");
const xlsx = require("xlsx");
const { Op, where, Sequelize } = require("sequelize");
const group = require("../models/group");

class ContestantService {
  // Lấy danh sách thí sinh (có hỗ trợ lọc và phân trang)
  static async getContestants(filters = {}, page = 1, limit = 20) {
    const options = {
      where: {},
      include: [
        {
          model: Group,
          as: "group",
        },
      ],
      order: [["id", "ASC"]],
      offset: (page - 1) * limit,
      limit,
    };

    // Xử lý các bộ lọc
    if (filters.status) options.where.status = filters.status;
    if (filters.group_id) options.where.group_id = filters.group_id;
    if (filters.search) {
      options.where[Op.or] = [
        { fullname: { [Op.like]: `%${filters.search}%` } },
        { email: { [Op.like]: `%${filters.search}%` } },
        { class: { [Op.like]: `%${filters.search}%` } },
      ];
    }

    const { count, rows } = await Contestant.findAndCountAll(options);

    return {
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      contestants: rows,
    };
  }

  // Lấy thông tin chi tiết của một thí sinh
  static async getContestantById(id) {
    const contestant = await Contestant.findByPk(id, {
      include: [
        { model: Group, as: "group" },
        { model: Score_log, as: "score_logs" },
        { model: Answer, as: "answers" },
      ],
    });

    if (!contestant) {
      throw new Error("Thí sinh không tồn tại");
    }

    return contestant;
  }

  // Tạo thí sinh mới
  static async createContestant(contestantData) {
    // Kiểm tra email đã tồn tại chưa
    const existingContestant = await Contestant.findOne({
      where: { email: contestantData.email },
    });

    if (existingContestant) {
      throw new Error("Email đã được sử dụng");
    }

    return await Contestant.create(contestantData);
  }

  // Cập nhật thông tin thí sinh
  static async updateContestant(id, contestantData) {
    const contestant = await Contestant.findByPk(id);

    if (!contestant) {
      throw new Error("Thí sinh không tồn tại");
    }

    // Nếu thay đổi email, kiểm tra email mới đã tồn tại chưa
    if (contestantData.email && contestantData.email !== contestant.email) {
      const existingContestant = await Contestant.findOne({
        where: { email: contestantData.email },
      });

      if (existingContestant) {
        throw new Error("Email đã được sử dụng");
      }
    }

    await contestant.update(contestantData);
    return contestant;
  }

  // Cập nhật trạng thái của thí sinh
  static async updateContestantStatus(id, status) {
    const contestant = await Contestant.findByPk(id);

    if (!contestant) {
      throw new Error("Thí sinh không tồn tại");
    }

    // Kiểm tra trạng thái hợp lệ
    const validStatuses = [
      "Chưa thi",
      "Đang thi",
      "Xác nhận 1",
      "Chờ cứu",
      "Bị loại",
    ];
    if (!validStatuses.includes(status)) {
      throw new Error("Trạng thái không hợp lệ");
    }

    await contestant.update({ status });
    return contestant;
  }

  // Xóa thí sinh
  static async deleteContestant(id) {
    const contestant = await Contestant.findByPk(id);

    if (!contestant) {
      throw new Error("Thí sinh không tồn tại");
    }

    await contestant.destroy();
    return { message: "Đã xóa thí sinh thành công" };
  }

  // lấy ds lớp thí sinh
  static async getListClass() {
    return Contestant.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("class")), "class"], // Lấy giá trị duy nhất
      ],
      raw: true,
    });
  }

  // lấy danh sách thí sinh dựa vào judge_id, match_id (kết bảng với groups, contestants, matches)
  static async getContestantByJudgeAndMatch(judge_id, match_id) {
    const contestants = await Contestant.findAll({
      include: [
        {
          model: Group,
          as: "group",
          where: {
            judge_id,
            match_id,
          },
          include: [
            {
              model: Match,
              as: "match",
            },
          ],
        },
      ],
    });

    return contestants;
  }

  // lấy group_id, group_name, match_id, match_name, judge_id, username dựa vào judge_id, match_id (GROUPS)
  static async getGroupAndMatch(judge_id, match_id) {
    const groupAndMatch = await Group.findOne({
      where: { judge_id, match_id },
      attributes: ["id", "group_name", "judge_id"],
      include: [
        {
          model: Match,
          as: "match",
          attributes: ["id", "match_name"],
        },
        {
          model: User,
          as: "judge",
          attributes: ["username"],
        },
      ],
    });

    return groupAndMatch;
  }
  static async updateContestantGroup(data) {
    //Lấy danh sach group theo trận đấu
    const listgroup = await Group.findAll({
      attributes: ["id"],
      where: { match_id: data.match_id },
      raw: true,
    });

    if (listgroup.length <= 0) return "Trận đấu hiện tại chưa có group";
    console.log(data);
    const listContestants = await ContestantService.getListContestants(
      data.className,
      data.class_year,
      data.status,
      data.limit,
      data.round_name
    );

    if (listContestants.length <= 0) return "Không có thí sinh để chia ";
    const round_name = await Match.findByPk(data.match_id, {
      attributes: ["round_name"],
      raw: true,
    });
    const k = Math.floor(listContestants.length / listgroup.length);
    const r = listContestants.length % listgroup.length;

    let index = 0;
    for (let i = 0; i < listContestants.length; i++) {
      await Contestant.update(
        {
          registration_number: i + 1,
          round_name: round_name.round_name,
          group_id: listgroup[index].id,
          status: "Đang thi",
        },
        { where: { id: listContestants[i].id } }
      );
      let maxgroup = k + (index < r ? 1 : 0);
      if ((i + 1) % maxgroup === 0) {
        index++;
      }
    }
    return "Chia Nhóm Thí Sinh Thành Công";
  }
  // Upload danh sách thí sinh excel
  static async uploadExcel(data) {
    const email = Array.from(new Map(data.map((c) => [c.email, c])).values());
    const unq = await Contestant.findAll({
      attributes: ["email"],
      where: { email: email.map((c) => c.email) },
    });
    const emailSet = new Set(unq.map((e) => e.email));
    const newContestant = email.filter((c) => !emailSet.has(c.email));
    if (newContestant.length == 0) {
      return {
        status: "error",
        msg: "Không có thí sinh mới để thêm",
      };
    } else {
      await Contestant.bulkCreate(newContestant, { ignoreDuplicates: true });
      return {
        status: "success",
        msg: `Thêm thành công +${newContestant.length} thí sinh`,
      };
    }
  }
  // donwload file theo
  static async downloadExcel(data) {
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Thí Sinh");
    const buffer = xlsx.write(workbook, { bookType: "xlsx", type: "buffer" });
    return buffer;
  }
  static async getClassByClass_Year(class_year) {
    return Contestant.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("class")), "class"], // Lấy giá trị duy nhất
      ],
      where: { class_year: class_year },
      raw: true,
    });
  }
  // Lấy danh sách thí sinh theo lớp
  static async getListContestantsByClass(classes) {
    const contestants = await Contestant.findAll({
      where: {
        class: { [Op.in]: classes },
        group_id: null,
      },
      limit: 60,
      order: Sequelize.literal("RAND()"),
      raw: true,
    });
    return contestants;
  }

  static async updateContestantGroupByClass(match_id, classes) {
    const groups = await Group.findAll({
      attributes: ["id"],
      where: { match_id: match_id },
      raw: true,
    });
    if (groups.length <= 0)
      return { message: "Trận đấu hiện tại chưa có nhóm" };
    console.log(groups);
    const contestants = await ContestantService.getListContestantsByClass(
      classes
    );
    if (contestants.length <= 0)
      return { massage: "Không có thí sinh để chia" };
    console.log(contestants.length, contestants);
    await Match.update(
      {
        class_names: classes,
      },
      {
        where: { id: match_id },
      }
    );
    const k = Math.floor(contestants.length / groups.length);
    const r = contestants.length % groups.length;
    let index = 0;
    for (let i = 0; i < contestants.length; i++) {
      await Contestant.update(
        {
          group_id: groups[index].id,
        },
        { where: { id: contestants[i].id } }
      );
      await MatchContestant.create({
        registration_number: i + 1,
        status: "Chưa thi",
        match_id: match_id,
        contestant_id: contestants[i].id,
      });
      let maxgroup = k + (index < r ? 1 : 0);
      if ((i + 1) % maxgroup === 0) {
        index++;
      }
    }
    return {
      massage: `Thêm ${contestants.length} thí sinh vào trận thành công `,
    };
  }
  // lấy danh sách khóa sinh viên
  static async getListClass_Year() {
    return Contestant.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("class_year")), "class_year"], // Lấy giá trị duy nhất
      ],
      raw: true,
    });
  }

  // API lấy total thí sinh và thí sinh còn lại
  static async getContestantTotal() {
    // lấy số thí sinh đang thi
    const total = await Contestant.count({ where: { status: "Đang thi" } });
    //lấy số thí sinh còn lại status = chờ cứu
    const remaining = await Contestant.count({ where: { status: "Chờ cứu" } });
    return { total, remaining };
  }

  // API lấy thí sinh theo trạng thái
  static async getContestantsWithStatus(data) {
    const contestants = await Contestant.findAll({
      where: { status: data.status },
    });
    return contestants;
  }
  static async getGroupContestantByMatch(match_id) {
    const list = await Group.findAll({
      attributes: ["id", "group_name"],
      include: [
        {
          model: Match,
          as: "match",
          attributes: ["id", "match_name"],
          where: { id: match_id }, // ✅ Lọc match_id ở đây
        },
        {
          model: Contestant,
          as: "contestants",
          attributes: ["id", "fullname"],
          include: [
            {
              model: MatchContestant,
              as: "matchContestants", // ✅ Đúng alias của hasMany
              attributes: ["registration_number"],
              where: { match_id }, // ✅ Lọc ở bảng trung gian
            },
          ],
        },
      ],
    });

    return list;
  }
}
module.exports = ContestantService;

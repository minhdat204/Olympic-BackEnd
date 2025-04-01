const { Question, Match, Contestant, Group } = require("../models");
const { error } = require("../schemas/questionSchema");
const { Sequelize } = require("../models");

const { emitMatchStatusUpdate } = require("../socketEmitters/matchEmitter");
const group = require("../models/group");

module.exports = {
  // tạo trận đấu mới
  async createMatch(matchData) {
    return Match.create(matchData);
  },

  // lấy danh sách các trận đấu
  async getMatches() {
    return Match.findAll({
      attributes: [
        "id",
        "match_name",
        "start_time",
        "end_time",
        "current_question_id",
        "rescue_1",
        "rescue_2",
        "plane",
        "rescued_count_1",
        "rescued_count_2",
        "round_name",
        "status",
      ],
      include: [
        {
          model: Contestant,
          as: "gold_winner",
          attributes: ["fullname"],
        },
        {
          model: Question,
          as: "current_question",
          where: { id: Sequelize.col("Match.current_question_id") },
          attributes: ["question_text"],
          required: false,
        },
      ],
    });
  },

  //chi tiết trận đấu
  async getMatchById(matchId) {
    return Match.findByPk(matchId);
  },

  // cập nhật trạng thái trận đấu
  async updateMatch(matchId, data) {
    const match = await Match.findByPk(matchId);
    if (!match) throw new Error("Không tìm thấy trận đấu");
    match.set(data);
    await match.save();
    return match;
  },
  async updateMatchBy(id, data) {
    const match = await Match.findByPk(id);
    if (!match) throw new Error(`Không tìm thấy trận đấu`);
    match.set(data);
    await match.save();
    return match;
  },
  async deteleMatch(id) {
    const match = await Match.findByPk(id);
    return match.destroy();
  },
  async getListRounds() {
    return Object.values(Match.getAttributes().round_name.values);
  },
  async getMatchByIdRounds(round_name) {
    return await Match.findAll({
      attributes: ["match_name"],
      where: { round_name },
    });
  },
  async getListStatus() {
    return Object.values(Match.getAttributes().status.values);
  },
  async UpdateWinGold(match_id, contestant_id) {
    const contestant_win = Match.update(
      { gold_winner_id: contestant_id },
      { where: { id: match_id } }
    );

    return contestant_win;
  },

  // update rescure_1, rescure_2, plane
  async updateRescue(matchId, data) {
    const match = await Match.findByPk(matchId);
    if (!match) throw new Error("Không tìm thấy trận đấu");
    match.set(data);
    await match.save();
    return match;
  },
  //  Lấy  danh sách  trận đấu theo trọng tài
  async getListMatchByJudge(judge_id) {
    return Match.findAll({
      attributes: ["id", "match_name"],
      include: [
        {
          model: Group,
          as: "groups",
          attributes: ["group_name"],
          where: { judge_id: judge_id },
        },
      ],
    });
  },

  /**DAT
   * Cập nhật chuỗi id thí sinh được cứu vào db (bảng match)
   * @param {*} matchId : id trận đấu
   * @param {*} field : rescued_count_1, rescued_count_2
   * @param {*} idsString : chuỗi id thí sinh được cứu (vd: 1,2,3,4)
   * @returns {boolean} : true nếu cập nhật thành công, false nếu thất bại
   *
   * NƠI SỬ DỤNG:
   * - contestantController: getRescueContestants
   */
  async updateRescuedCountInMatch(matchId, field, idsString) {
    try {
      // field là tên thuộc tính trong bảng match
      if (field !== "rescued_count_1" && field !== "rescued_count_2") {
        throw new Error("Invalid field name");
      }

      // cập nhật chuỗi id thí sinh được cứu vào bảng match
      await Match.update({ [field]: idsString }, { where: { id: matchId } });

      return true;
    } catch (error) {
      console.error("Error updating rescued count:", error);
      throw new Error("Failed to update rescued contestants count");
    }
  },

  /**DAT
   * lấy mảng id thí sinh được cứu từ db (bảng match: thuộc tính rescue_1, rescue_2)
   * @param {number} matchId - ID của trận đấu
   * @param {number} rescueNumber - Số lần cứu trợ (1 hoặc 2)
   */
  async getContestantIdsRescue(matchId, rescueNumber) {
    // Xác định field cần lấy dữ liệu dựa vào rescueNumber
    const field = rescueNumber == 1 ? "rescued_count_1" : "rescued_count_2";

    /**
     * Lấy chuỗi ID thí sinh đã lưu trước đó từ database
     * @param {number} matchId - ID của trận đấu
     *
     */
    const match = await this.getMatchById(matchId);

    if (
      !match ||
      !match[field] ||
      match[field] === "" ||
      match[field] === null ||
      match[field] === undefined ||
      match[field] == -1
    ) {
      return [];
    }

    // Tách chuỗi ID thành mảng và chuyển về kiểu số
    const contestantIds = match[field]
      .split(",")
      .map((id) => parseInt(id.trim(), 10));

    return contestantIds;
  },

  /**DAT
   * lấy gold_winner_id từ bảng match
   * @param {number} matchId - ID của trận đấu
   * @return {number} - ID của người thắng cuộc (gold_winner_id)
   * 
   * SỬ DỤNG Ở:
   * - contestantController: getContestants20WithInclusion
   */
  async getGoldWinnerId(matchId) {
    const match = await this.getMatchById(matchId);
    if (!match) throw new Error("Không tìm thấy trận đấu");
    return match.gold_winner_id;
  },

  /**
   * lấy question_order truy xuất current_question_id từ bảng match
   * @param {number} matchId - ID của trận đấu
   * @return {number} - order của câu hỏi hiện tại (question_order)
   */
  async getQuestionOrder(matchId) {
    const match = await this.getMatchById(matchId);
    if (!match) throw new Error("Không tìm thấy trận đấu");
    return match.current_question_id;
  },
};

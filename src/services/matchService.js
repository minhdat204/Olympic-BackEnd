const { Question, Match, Contestant } = require("../models");
const { error } = require("../schemas/questionSchema");
const { Sequelize } = require("../models");

const { emitMatchStatusUpdate } = require("../socketEmitters/matchEmitter");

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
};

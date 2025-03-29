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
  async getListMatchByJudge(match_id, judge_id) {
    return Match.findAll({
      attributes: ["id", "match_name"],
      include: [
        {
          model: Group,
          as: "groups",
          attributes: ["group_name"],
          where: { match_id: match_id, judge_id: judge_id },
        },
      ],
    });
  },
};

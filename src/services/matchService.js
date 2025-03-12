const { Match } = require("../models");
const { error } = require("../schemas/questionSchema");
const { emitMatchStatusUpdate } = require("../socketEmitters/matchEmitter");

module.exports = {
  // tạo trận đấu mới
  async createMatch(matchData) {
    return Match.create(matchData);
  },

  // lấy danh sách các trận đấu
  async getMatches() {
    return Match.findAll();
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
  async deteleMatch(id) {
    const match = await Match.findByPk(id);
    return match.destroy();
  },
};

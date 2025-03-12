const { Match } = require("../models");
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
  async updateStatus(matchId, newStatus) {
    const match = await Match.findByPk(matchId);
    if (!match) throw new Error("⚠️ Match not found");

    match.status = newStatus;
    await match.save();

    // Emit sự kiện realtime
    emitMatchStatusUpdate(matchId, newStatus);

    return match;
  },
  async deteleMatch(id) {
    const match = await Match.findByPk(id);
    return match.destroy();
  },
};

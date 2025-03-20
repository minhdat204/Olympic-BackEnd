const { Question, Match, Contestant, MatchContestant } = require("../models");
const { Sequelize } = require("../models");

module.exports = {
  // tạo trận đấu mới
  async createMatchContestants(data) {
    return MatchContestant.create(data);
  },

  // lấy danh sách các trận đấu
  async getMatchContestants() {
    console.log("longngu");
    return MatchContestant.findAll();
  },

  //chi tiết trận đấu
  async getMatchContestant(id) {
    return MatchContestant.findByPk(id);
  },

  // cập nhật trạng thái trận đấu
  async updateMatchContestants(id, data) {
    const match = await MatchContestant.findByPk(id);
    if (!match) throw new Error("Không tìm thấy trận đấu");
    match.set(data);
    await match.save();
    return match;
  },
  async deleteMatchContestant(id) {
    const match = await MatchContestant.findByPk(id);
    return match.destroy();
  },
  async getListStatus() {
    return Object.values(MatchContestant.getAttributes().status.values);
  },
};

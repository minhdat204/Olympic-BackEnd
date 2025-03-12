const { Questions } = require("../models");
module.exports = {
  // tạo trận đấu mới
  async createQuestions(QuestionsData) {
    return Questions.create(QuestionsData);
  },

  // lấy danh sách các trận đấu
  async getQuestionses() {
    return Questions.findAll();
  },

  //chi tiết trận đấu
  async getQuestionsById(QuestionsId) {
    return Questions.findByPk(QuestionsId);
  },

  // cập nhật trạng thái trận đấu
  async updateStatus(QuestionsId, data) {
    const Questions = await Questions.findByPk(QuestionsId);
    if (!Questions) throw new Error("⚠️ Questions not found");

    Questions.status = newStatus;
    await Questions.save();
    return Questions;
  },
  async deteleQuestions(id) {
    const Questions = await Questions.findByPk(id);
    return Questions.destroy();
  },
};

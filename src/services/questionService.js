const { Question } = require("../models");
module.exports = {
  // tạo trận đấu mới
  async createQuestion(QuestionsData) {
    return Question.create(QuestionsData);
  },

  // lấy danh sách các trận đấu
  async getQuestion() {
    return Question.findAll();
  },

  //chi tiết trận đấu
  async getQuestionById(QuestionsId) {
    return Question.findByPk(QuestionsId);
  },

  // cập nhật trạng thái trận đấu
  async updateStatus(QuestionsId, data) {
    const Question = await Question.findByPk(QuestionsId);
    if (!Question) throw new Error("⚠️ Question not found");

    Question.status = newStatus;
    await Question.save();
    return Question;
  },
  async deteleQuestion(id) {
    const Question = await Question.findByPk(id);
    return Question.destroy();
  },
};

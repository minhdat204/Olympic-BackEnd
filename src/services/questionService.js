const { Question } = require("../models");
const { error } = require("../schemas/questionSchema");
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
  async updateQuestion(QuestionsId, data) {
    const question = await Question.findByPk(QuestionsId);
    if (!question) throw new Error("Không tìm thấy câu hỏi");
    question.set(data);
    await question.save();
    return question;
  },
  async deteleQuestion(id) {
    const question = await Question.findByPk(id);
    return question.destroy();
  },
};

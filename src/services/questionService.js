const { getQuestions } = require("../controllers/questionController");
const { Question, Match } = require("../models");
const { error } = require("../schemas/questionSchema");
module.exports = {
  // tạo trận đấu mới
  async createQuestion(QuestionsData) {
    return Question.create(QuestionsData);
  },

  // lấy danh sách các trận đấu
  async getQuestions() {
    return Question.findAll({
      include: [
        {
          model: Match,
          as: "match",
          attributes: ["match_name"],
        },
      ],
    });
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
  async updateQuestionBy(QuestionsId, data) {
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
  async getListDificulty() {
    return Object.values(Question.getAttributes().dificulty.values);
  },
  async getListQuestionType() {
    return Object.values(Question.getAttributes().question_type.values);
  },
  async getQuestionsByMatch(match_id) {
    return Question.findAll({
      where: { match_id },
      include: [
        {
          model: Match,
          as: "match",
          attributes: ["match_name"],
        },
      ],
    });
  },
};

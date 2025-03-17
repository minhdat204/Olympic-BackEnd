const { getQuestions } = require("../controllers/questionController");
const { Question, Match } = require("../models");
const { error } = require("../schemas/questionSchema");
const { Sequelize } = require("sequelize");
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

  // cập nhật trạng thái câu hỏi
  async updateQuestion(QuestionsId, data) {
    const question = await Question.findByPk(QuestionsId);
    if (!question) throw new Error("Không tìm thấy câu hỏi");
    question.set(data);
    await question.save();
    return question;
  },

  //cập nhật 1 phần của caua hỏi
  async updateQuestionBy(QuestionsId, data) {
    const question = await Question.findByPk(QuestionsId);
    if (!question) throw new Error("Không tìm thấy câu hỏi");
    question.set(data);
    await question.save();
    return question;
  },

  // xóa trận đấu
  async deteleQuestion(id) {
    const question = await Question.findByPk(id);
    return question.destroy();
  },

  // lấy ds độ khó
  async getListDificulty() {
    return Object.values(Question.getAttributes().dificulty.values);
  },

  // lấy ds loại câu hỏi
  async getListQuestionType() {
    return Object.values(Question.getAttributes().question_type.values);
  },

  // lấy danh sách câu hỏi theo trận đấu
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

  // lấy chi tiết câu hỏi theo trận đấu
  async getQuestionByMatch(question_order, match_id) {
    return Question.findOne({
      where: { match_id, question_order },
      include: [
        {
          model: Match,
          as: "match",
          attributes: ["match_name"],
        },
      ],
    });
  },

  // lấy câu hỏi hiện tại để load lại
  async getCurrentQuestion(match_id) {
    //truy vấn kiểu như này: tôi có bảng matches có cột current_question_id và khi nhập url có param là match_id thì trước tiên sẽ truy vấn ra trận đấu sau đó lấy current_question_id để tiếp tục truy vấn tới question để lấy câu hỏi.
    const match = await Match.findOne({
        where: { id: match_id },
        include: {
            model: Question,
            as: 'current_question',
        }
    });
    if (!match || !match.current_question_id) throw new Error("Trận đấu hoặc câu hỏi không tồn tại");
    return match.current_question;
  },

  // Cập nhật cột time_left thành giá trị của cột timer trong bảng question
  async updateQuestionTimeLeft(question_id) {
    await Question.update(
      { time_left: Sequelize.literal("timer") }, // Gán time_left = timer
      { where: { id: question_id } }
    );
  
    // Lấy giá trị time_left sau khi cập nhật
    const result = await Question.findOne({
      attributes: ["time_left"], // Chỉ lấy cột time_left
      where: { id: question_id },
    });
  
    if (!result) throw new Error("Không tìm thấy câu hỏi");
  
    return result.time_left; // Trả về giá trị time_left
  }
};
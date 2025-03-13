const QuestionService = require("../services/questionService");

// Tạo câu hỏi
exports.createQuestion = async (req, res) => {
  try {
    const question = await QuestionService.createQuestion(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lấy danh sách câu hỏi
exports.getQuestions = async (req, res) => {
  try {
    const questions = await QuestionService.getQuestions();
    res.json(questions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lấy chi tiết câu hỏi theo ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await QuestionService.getQuestionById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "⚠️ Question not found" });
    }
    res.json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cập nhật trạng thái câu hỏi
exports.updateQuestions = async (req, res) => {
  try {
    const question = await QuestionService.updateQuestion(
      req.params.id,
      req.body
    );
    res.json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa câu hỏi
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await QuestionService.deteleQuestion(req.params.id);
    res.json({ message: " Xóa câu hỏi thành công" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Cập nhật 1 phần của câu hỏi
exports.updateQuestionBy = async (req, res) => {
  try {
    const question = await QuestionService.updateQuestionBy(
      req.params.id,
      req.body
    );
    res.json(question);
  } catch (error) {
    req.status(400).json({ error: error.message });
  }
};

exports.getListDificulty = async (req, res) => {
  try {
    const listDificulty = await QuestionService.getListDificulty();
    res.json({ listDificulty: listDificulty });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getListQuestionType = async (req, res) => {
  try {
    const listQuestionType = await QuestionService.getListQuestionType();
    res.json({ listQuestionType: listQuestionType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getQuestionsByMatch = async (req, res) => {
  try {
    const quesion = await QuestionService.getQuestionsByMatch(req.params.id);
    res.json(quesion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

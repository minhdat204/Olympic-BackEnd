const QuestionService = require("../services/questionService");

// tạo trận đấu
exports.createquestion = async (req, res) => {
  try {
    const question = await QuestionService.createQueston(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// lấy danh sách các trận đấu
exports.getquestions = async (req, res) => {
  try {
    const question = await QuestionService.getQuestons();
    res.json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// chi tiết trận đấu
exports.getquestionById = async (req, res) => {
  try {
    const question = await QuestionService.getQuestionById(req.params.id);
    res.json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.updatequestions = async (req, res) => {
  try {
    const question = await QuestionService.updatequestions(
      req.params.id,
      req.body
    );
    res.json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

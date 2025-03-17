const QuestionService = require("../services/questionService");
const { emitQuestion } = require("../socketEmitters/questionEmitter");

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

// Lấy danh sách câu hỏi theo trận đấu
exports.getQuestionsByMatch = async (req, res) => {
  try {
    const quesion = await QuestionService.getQuestionsByMatch(req.params.id);
    res.json(quesion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lấy chi tiết câu hỏi theo trận đấu
exports.getQuestionByMatch = async (req, res) => {
  try {
    const question = await QuestionService.getQuestionByMatch(
      req.params.question_order,
      req.params.match_id
    );
    res.json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// gọi emit socket để gửi câu hỏi cho màn hình trình chiếu
exports.emitQuestionByMatch = async (req, res) => {
  try {
    const question_order = req.params.question_order;
    const match_id = req.params.match_id;
    console.log(question_order, match_id);
    // lấy câu hỏi theo trận đấu và thứ tự câu hỏi
    const question = await QuestionService.getQuestionByMatch(
      question_order,
      match_id
    );
    // gọi emit socket để gửi câu hỏi
    emitQuestion(match_id, question_order, question);
    res.json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// lấy câu hỏi hiện tại
exports.getCurrentQuestion = async (req, res) => {
  try {
    const match_id = req.params.match_id;
    const question = await QuestionService.getCurrentQuestion(match_id);
    res.json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Cập nhật cột time_left thành giá trị của cột timer trong bảng question
exports.updateQuestionTimeLeft = async (req, res) => {
  try {
    const question_id = req.params.id;
    const result = await QuestionService.updateQuestionTimeLeft(question_id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
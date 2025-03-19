const AnswerService = require('../services/answerService');

class AnswerController {
  // Lấy danh sách câu trả lời
  static async getAnswers(req, res) {
    try {
      const filters = {
        contestant_id: req.query.contestant_id,
        question_id: req.query.question_id,
        match_id: req.query.match_id,
        is_correct: req.query.is_correct === 'true' ? true :
                   req.query.is_correct === 'false' ? false : undefined
      };
      
      // Loại bỏ các filter undefined
      Object.keys(filters).forEach(key => 
        filters[key] === undefined && delete filters[key]
      );
      
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      
      const result = await AnswerService.getAnswers(filters, page, limit);
      
      res.status(200).json({
        status: 'success',
        message: 'Lấy danh sách câu trả lời thành công',
        data: result
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message || 'Đã có lỗi xảy ra'
      });
    }
  }

  // Lấy chi tiết câu trả lời
  static async getAnswerById(req, res) {
    try {
      const answerId = req.params.id;
      const answer = await AnswerService.getAnswerById(answerId);
      
      res.status(200).json({
        status: 'success',
        message: 'Lấy thông tin câu trả lời thành công',
        data: answer
      });
    } catch (error) {
      res.status(error.message === 'Câu trả lời không tồn tại' ? 404 : 500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Tạo câu trả lời mới
  static async createAnswer(req, res) {
    try {
      const answerData = req.body;
      const newAnswer = await AnswerService.createAnswer(answerData);
      
      res.status(201).json({
        status: 'success',
        message: 'Tạo câu trả lời thành công',
        data: newAnswer
      });
    } catch (error) {
      const statusCode = 
        error.message.includes('không tồn tại') ? 404 :
        error.message.includes('đã trả lời') ? 409 : 500;
      
      res.status(statusCode).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Cập nhật câu trả lời
  static async updateAnswer(req, res) {
    try {
      const answerId = req.params.id;
      const answerData = req.body;
      
      const updatedAnswer = await AnswerService.updateAnswer(answerId, answerData);
      
      res.status(200).json({
        status: 'success',
        message: 'Cập nhật câu trả lời thành công',
        data: updatedAnswer
      });
    } catch (error) {
      const statusCode = 
        error.message === 'Câu trả lời không tồn tại' ? 404 :
        error.message.includes('không tồn tại') ? 404 : 500;
      
      res.status(statusCode).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Xóa câu trả lời
  static async deleteAnswer(req, res) {
    try {
      const answerId = req.params.id;
      await AnswerService.deleteAnswer(answerId);
      
      res.status(200).json({
        status: 'success',
        message: 'Xóa câu trả lời thành công'
      });
    } catch (error) {
      res.status(error.message === 'Câu trả lời không tồn tại' ? 404 : 500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Lấy câu trả lời theo thí sinh
  static async getAnswersByContestantId(req, res) {
    try {
      const contestantId = req.params.contestantId;
      const answers = await AnswerService.getAnswersByContestantId(contestantId);
      
      res.status(200).json({
        status: 'success',
        message: 'Lấy câu trả lời của thí sinh thành công',
        data: answers
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Lấy câu trả lời theo câu hỏi
  static async getAnswersByQuestionId(req, res) {
    try {
      const questionId = req.params.questionId;
      const answers = await AnswerService.getAnswersByQuestionId(questionId);
      
      res.status(200).json({
        status: 'success',
        message: 'Lấy câu trả lời của câu hỏi thành công',
        data: answers
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Lấy câu trả lời theo trận đấu
  static async getAnswersByMatchId(req, res) {
    try {
      const matchId = req.params.matchId;
      const answers = await AnswerService.getAnswersByMatchId(matchId);
      
      res.status(200).json({
        status: 'success',
        message: 'Lấy câu trả lời của trận đấu thành công',
        data: answers
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Lấy tỷ lệ trả lời đúng cho một câu hỏi
  static async getCorrectRateByQuestionId(req, res) {
    try {
      const questionId = req.params.questionId;
      const stats = await AnswerService.getCorrectRateByQuestionId(questionId);
      
      res.status(200).json({
        status: 'success',
        message: 'Lấy tỷ lệ trả lời đúng thành công',
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Lấy tỷ lệ trả lời đúng cho một thí sinh
  static async getCorrectRateByContestantId(req, res) {
    try {
      const { contestantId, matchId } = req.params;
      const stats = await AnswerService.getCorrectRateByContestantId(contestantId, matchId);
      
      res.status(200).json({
        status: 'success',
        message: 'Lấy tỷ lệ trả lời đúng thành công',
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Lấy thống kê câu trả lời theo trận đấu
  static async getAnswersStatsByMatch(req, res) {
    try {
      const matchId = req.params.matchId;
      const stats = await AnswerService.getAnswersStatsByMatch(matchId);
      
      res.status(200).json({
        status: 'success',
        message: 'Lấy thống kê câu trả lời thành công',
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }
}

module.exports = AnswerController;
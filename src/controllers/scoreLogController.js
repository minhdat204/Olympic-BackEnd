const ScoreLogService = require('../services/scoreLogService');

class ScoreLogController {
  // Lấy danh sách log điểm
  static async getScoreLogs(req, res) {
    try {
      const filters = {
        match_id: req.query.match_id,
        contestant_id: req.query.contestant_id,
        rescued: req.query.rescued === 'true',
        min_score: req.query.min_score,
        max_score: req.query.max_score
      };
      
      // Loại bỏ các filter undefined
      Object.keys(filters).forEach(key => 
        filters[key] === undefined && delete filters[key]
      );
      
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      
      const result = await ScoreLogService.getScoreLogs(filters, page, limit);
      
      res.status(200).json({
        status: 'success',
        message: 'Lấy danh sách log điểm thành công',
        data: result
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message || 'Đã có lỗi xảy ra'
      });
    }
  }

  // Lấy chi tiết log điểm
  static async getScoreLogById(req, res) {
    try {
      const scoreLogId = req.params.id;
      const scoreLog = await ScoreLogService.getScoreLogById(scoreLogId);
      
      res.status(200).json({
        status: 'success',
        message: 'Lấy thông tin log điểm thành công',
        data: scoreLog
      });
    } catch (error) {
      res.status(error.message === 'Log điểm không tồn tại' ? 404 : 500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Lấy tất cả log điểm của một thí sinh
  static async getScoreLogsByContestantId(req, res) {
    try {
      const contestantId = req.params.contestantId;
      const scoreLogs = await ScoreLogService.getScoreLogsByContestantId(contestantId);
      
      res.status(200).json({
        status: 'success',
        message: 'Lấy log điểm của thí sinh thành công',
        data: scoreLogs
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }
  
  // Lấy tất cả log điểm của một trận đấu
  static async getScoreLogsByMatchId(req, res) {
    try {
      const matchId = req.params.matchId;
      const scoreLogs = await ScoreLogService.getScoreLogsByMatchId(matchId);
      
      res.status(200).json({
        status: 'success',
        message: 'Lấy log điểm của trận đấu thành công',
        data: scoreLogs
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Tạo log điểm mới
  static async createScoreLog(req, res) {
    try {
      const scoreLogData = req.body;
      const newScoreLog = await ScoreLogService.createScoreLog(scoreLogData);
      
      res.status(201).json({
        status: 'success',
        message: 'Tạo log điểm thành công',
        data: newScoreLog
      });
    } catch (error) {
      const statusCode = 
        error.message.includes('không tồn tại') ? 404 : 500;
      
      res.status(statusCode).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Cập nhật log điểm
  static async updateScoreLog(req, res) {
    try {
      const scoreLogId = req.params.id;
      const scoreLogData = req.body;
      
      const updatedScoreLog = await ScoreLogService.updateScoreLog(scoreLogId, scoreLogData);
      
      res.status(200).json({
        status: 'success',
        message: 'Cập nhật log điểm thành công',
        data: updatedScoreLog
      });
    } catch (error) {
      const statusCode = 
        error.message === 'Log điểm không tồn tại' ? 404 :
        error.message.includes('không tồn tại') ? 404 : 500;
      
      res.status(statusCode).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Xóa log điểm
  static async deleteScoreLog(req, res) {
    try {
      const scoreLogId = req.params.id;
      await ScoreLogService.deleteScoreLog(scoreLogId);
      
      res.status(200).json({
        status: 'success',
        message: 'Xóa log điểm thành công'
      });
    } catch (error) {
      res.status(error.message === 'Log điểm không tồn tại' ? 404 : 500).json({
        status: 'error',
        message: error.message
      });
    }
  }
  
  // Lấy bảng xếp hạng điểm cho một trận đấu
  static async getScoreboardByMatch(req, res) {
    try {
      const matchId = req.params.matchId;
      const scoreboard = await ScoreLogService.getScoreboardByMatch(matchId);
      
      res.status(200).json({
        status: 'success',
        message: 'Lấy bảng xếp hạng thành công',
        data: scoreboard
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }
  
  // Tính tổng điểm của thí sinh trong một trận đấu
  static async calculateTotalScore(req, res) {
    try {
      const { contestantId, matchId } = req.params;
      const totalScore = await ScoreLogService.calculateTotalScore(contestantId, matchId);
      
      res.status(200).json({
        status: 'success',
        message: 'Tính tổng điểm thành công',
        data: {
          contestant_id: parseInt(contestantId),
          match_id: parseInt(matchId),
          total_score: totalScore
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }
}

module.exports = ScoreLogController;
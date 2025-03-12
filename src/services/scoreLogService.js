const { Score_log, Contestant, Match } = require('../models');
const { Op } = require('sequelize');

class ScoreLogService {
  // Lấy danh sách log điểm (có hỗ trợ lọc và phân trang)
  static async getScoreLogs(filters = {}, page = 1, limit = 20) {
    const options = {
      where: {},
      include: [
        {
          model: Contestant,
          as: 'contestant',
          attributes: ['id', 'fullname', 'email', 'class', 'status']
        },
        {
          model: Match,
          as: 'match',
          attributes: ['id', 'match_name', 'round_name', 'status']
        }
      ],
      order: [['id', 'ASC']],
      offset: (page - 1) * limit,
      limit
    };

    // Xử lý các bộ lọc
    if (filters.match_id) options.where.match_id = filters.match_id;
    if (filters.contestant_id) options.where.contestant_id = filters.contestant_id;
    if (filters.rescued !== undefined) options.where.rescued = filters.rescued;
    
    // Lọc theo khoảng điểm
    if (filters.min_score !== undefined) {
      options.where.score = {
        ...options.where.score,
        [Op.gte]: filters.min_score
      };
    }
    
    if (filters.max_score !== undefined) {
      options.where.score = {
        ...options.where.score,
        [Op.lte]: filters.max_score
      };
    }

    const { count, rows } = await Score_log.findAndCountAll(options);
    
    return {
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      scoreLogs: rows
    };
  }

  // Lấy chi tiết của một log điểm
  static async getScoreLogById(id) {
    const scoreLog = await Score_log.findByPk(id, {
      include: [
        {
          model: Contestant,
          as: 'contestant',
          attributes: ['id', 'fullname', 'email', 'class', 'status']
        },
        {
          model: Match,
          as: 'match',
          attributes: ['id', 'match_name', 'round_name', 'status']
        }
      ]
    });

    if (!scoreLog) {
      throw new Error('Log điểm không tồn tại');
    }

    return scoreLog;
  }

  // Lấy tất cả log điểm của một thí sinh
  static async getScoreLogsByContestantId(contestantId) {
    const scoreLogs = await Score_log.findAll({
      where: { contestant_id: contestantId },
      include: [
        {
          model: Match,
          as: 'match',
          attributes: ['id', 'match_name', 'round_name', 'status']
        }
      ],
      order: [['created_at', 'DESC']]
    });
    
    return scoreLogs;
  }
  
  // Lấy tất cả log điểm của một trận đấu
  static async getScoreLogsByMatchId(matchId) {
    const scoreLogs = await Score_log.findAll({
      where: { match_id: matchId },
      include: [
        {
          model: Contestant,
          as: 'contestant',
          attributes: ['id', 'fullname', 'email', 'class', 'status']
        }
      ],
      order: [['created_at', 'DESC']]
    });
    
    return scoreLogs;
  }

  // Tạo log điểm mới
  static async createScoreLog(scoreLogData) {
    // Kiểm tra contestant_id có tồn tại
    const contestant = await Contestant.findByPk(scoreLogData.contestant_id);
    if (!contestant) {
      throw new Error('Thí sinh không tồn tại');
    }
    
    // Kiểm tra match_id có tồn tại
    const match = await Match.findByPk(scoreLogData.match_id);
    if (!match) {
      throw new Error('Trận đấu không tồn tại');
    }

    return await Score_log.create(scoreLogData);
  }

  // Cập nhật log điểm
  static async updateScoreLog(id, scoreLogData) {
    const scoreLog = await Score_log.findByPk(id);
    if (!scoreLog) {
      throw new Error('Log điểm không tồn tại');
    }

    // Nếu cập nhật contestant_id, kiểm tra thí sinh có tồn tại
    if (scoreLogData.contestant_id && scoreLogData.contestant_id !== scoreLog.contestant_id) {
      const contestant = await Contestant.findByPk(scoreLogData.contestant_id);
      if (!contestant) {
        throw new Error('Thí sinh không tồn tại');
      }
    }
    
    // Nếu cập nhật match_id, kiểm tra trận đấu có tồn tại
    if (scoreLogData.match_id && scoreLogData.match_id !== scoreLog.match_id) {
      const match = await Match.findByPk(scoreLogData.match_id);
      if (!match) {
        throw new Error('Trận đấu không tồn tại');
      }
    }

    await scoreLog.update(scoreLogData);
    return scoreLog;
  }

  // Xóa log điểm
  static async deleteScoreLog(id) {
    const scoreLog = await Score_log.findByPk(id);
    if (!scoreLog) {
      throw new Error('Log điểm không tồn tại');
    }

    await scoreLog.destroy();
    return { message: 'Đã xóa log điểm thành công' };
  }
  
  // Tính tổng điểm của thí sinh trong một trận đấu
  static async calculateTotalScore(contestantId, matchId) {
    const result = await Score_log.sum('score', {
      where: {
        contestant_id: contestantId,
        match_id: matchId
      }
    });
    
    return result || 0; // Trả về 0 nếu chưa có điểm
  }
  
  // Lấy bảng xếp hạng điểm cho một trận đấu
  static async getScoreboardByMatch(matchId) {
    const scoreLogs = await Score_log.findAll({
      where: { match_id: matchId },
      include: [
        {
          model: Contestant,
          as: 'contestant',
          attributes: ['id', 'fullname', 'email', 'class', 'group_id', 'status']
        }
      ],
      order: [['score', 'DESC']]
    });
    
    // Tạo bảng xếp hạng từ log điểm
    const scoreMap = {};
    
    scoreLogs.forEach(log => {
      const contestantId = log.contestant_id;
      
      if (!scoreMap[contestantId]) {
        scoreMap[contestantId] = {
          contestant: log.contestant,
          totalScore: log.score,
          rescueCount: log.rescued ? 1 : 0
        };
      } else {
        scoreMap[contestantId].totalScore += log.score;
        if (log.rescued) {
          scoreMap[contestantId].rescueCount += 1;
        }
      }
    });
    
    // Chuyển kết quả thành mảng và sắp xếp theo điểm
    const scoreboard = Object.values(scoreMap).sort((a, b) => b.totalScore - a.totalScore);
    
    return scoreboard;
  }
}

module.exports = ScoreLogService;
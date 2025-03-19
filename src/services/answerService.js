const { Answer, Contestant, Question, Match } = require('../models');
const { Op } = require('sequelize');

class AnswerService {
  // Lấy danh sách câu trả lời (có hỗ trợ lọc và phân trang)
  static async getAnswers(filters = {}, page = 1, limit = 20) {
    const options = {
      where: {},
      include: [
        {
          model: Contestant,
          as: 'contestant',
          attributes: ['id', 'fullname', 'email', 'status']
        },
        {
          model: Question,
          as: 'question',
          attributes: ['id', 'question_text', 'question_type', 'correct_answer']
        },
        {
          model: Match,
          as: 'match',
          attributes: ['id', 'match_name', 'round_name', 'status']
        }
      ],
      order: [['created_at', 'DESC']],
      offset: (page - 1) * limit,
      limit
    };

    // Xử lý các bộ lọc
    if (filters.contestant_id) options.where.contestant_id = filters.contestant_id;
    if (filters.question_id) options.where.question_id = filters.question_id;
    if (filters.match_id) options.where.match_id = filters.match_id;
    if (filters.is_correct !== undefined) options.where.is_correct = filters.is_correct;

    const { count, rows } = await Answer.findAndCountAll(options);
    
    return {
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      answers: rows
    };
  }

  // Lấy chi tiết của một câu trả lời
  static async getAnswerById(id) {
    const answer = await Answer.findByPk(id, {
      include: [
        {
          model: Contestant,
          as: 'contestant',
          attributes: ['id', 'fullname', 'email', 'status']
        },
        {
          model: Question,
          as: 'question',
          attributes: ['id', 'question_text', 'question_type', 'correct_answer']
        },
        {
          model: Match,
          as: 'match',
          attributes: ['id', 'match_name', 'round_name', 'status']
        }
      ]
    });

    if (!answer) {
      throw new Error('Câu trả lời không tồn tại');
    }

    return answer;
  }

  // Tạo câu trả lời mới
  static async createAnswer(answerData) {
    // Kiểm tra contestant_id có tồn tại
    const contestant = await Contestant.findByPk(answerData.contestant_id);
    if (!contestant) {
      throw new Error('Thí sinh không tồn tại');
    }

    // Kiểm tra question_id có tồn tại
    const question = await Question.findByPk(answerData.question_id);
    if (!question) {
      throw new Error('Câu hỏi không tồn tại');
    }

    // Kiểm tra match_id có tồn tại
    const match = await Match.findByPk(answerData.match_id);
    if (!match) {
      throw new Error('Trận đấu không tồn tại');
    }

    // Kiểm tra xem thí sinh đã trả lời câu hỏi này trong trận đấu chưa
    const existingAnswer = await Answer.findOne({
      where: {
        contestant_id: answerData.contestant_id,
        question_id: answerData.question_id,
        match_id: answerData.match_id
      }
    });

    if (existingAnswer) {
      throw new Error('Thí sinh đã trả lời câu hỏi này trong trận đấu');
    }

    return await Answer.create(answerData);
  }

  // Cập nhật câu trả lời
  static async updateAnswer(id, answerData) {
    const answer = await Answer.findByPk(id);

    if (!answer) {
      throw new Error('Câu trả lời không tồn tại');
    }

    // Kiểm tra các khóa ngoại nếu được cập nhật
    if (answerData.contestant_id) {
      const contestant = await Contestant.findByPk(answerData.contestant_id);
      if (!contestant) {
        throw new Error('Thí sinh không tồn tại');
      }
    }

    if (answerData.question_id) {
      const question = await Question.findByPk(answerData.question_id);
      if (!question) {
        throw new Error('Câu hỏi không tồn tại');
      }
    }

    if (answerData.match_id) {
      const match = await Match.findByPk(answerData.match_id);
      if (!match) {
        throw new Error('Trận đấu không tồn tại');
      }
    }

    await answer.update(answerData);
    return answer;
  }

  // Xóa câu trả lời
  static async deleteAnswer(id) {
    const answer = await Answer.findByPk(id);

    if (!answer) {
      throw new Error('Câu trả lời không tồn tại');
    }

    await answer.destroy();
    return { message: 'Đã xóa câu trả lời thành công' };
  }

  // Lấy tất cả câu trả lời của một thí sinh
  static async getAnswersByContestantId(contestantId) {
    const answers = await Answer.findAll({
      where: { contestant_id: contestantId },
      include: [
        {
          model: Question,
          as: 'question',
          attributes: ['id', 'question_text', 'question_type']
        },
        {
          model: Match,
          as: 'match',
          attributes: ['id', 'match_name', 'round_name']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    return answers;
  }

  // Lấy tất cả câu trả lời cho một câu hỏi
  static async getAnswersByQuestionId(questionId) {
    const answers = await Answer.findAll({
      where: { question_id: questionId },
      include: [
        {
          model: Contestant,
          as: 'contestant',
          attributes: ['id', 'fullname', 'email']
        },
        {
          model: Match,
          as: 'match',
          attributes: ['id', 'match_name', 'round_name']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    return answers;
  }

  // Lấy tất cả câu trả lời trong một trận đấu
  static async getAnswersByMatchId(matchId) {
    const answers = await Answer.findAll({
      where: { match_id: matchId },
      include: [
        {
          model: Contestant,
          as: 'contestant',
          attributes: ['id', 'fullname', 'email', 'group_id']
        },
        {
          model: Question,
          as: 'question',
          attributes: ['id', 'question_text', 'question_type', 'question_order']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    return answers;
  }

  // Tính tỷ lệ trả lời đúng cho một câu hỏi
  static async getCorrectRateByQuestionId(questionId) {
    const totalAnswers = await Answer.count({
      where: { question_id: questionId }
    });

    const correctAnswers = await Answer.count({
      where: { 
        question_id: questionId,
        is_correct: true
      }
    });

    return {
      question_id: questionId,
      total_answers: totalAnswers,
      correct_answers: correctAnswers,
      correct_rate: totalAnswers > 0 ? (correctAnswers / totalAnswers * 100).toFixed(2) + '%' : '0%'
    };
  }

  // Tính tỷ lệ trả lời đúng cho một thí sinh
  static async getCorrectRateByContestantId(contestantId, matchId = null) {
    const whereClause = { contestant_id: contestantId };
    if (matchId) whereClause.match_id = matchId;

    const totalAnswers = await Answer.count({
      where: whereClause
    });

    const correctAnswers = await Answer.count({
      where: { 
        ...whereClause,
        is_correct: true
      }
    });

    return {
      contestant_id: contestantId,
      match_id: matchId,
      total_answers: totalAnswers,
      correct_answers: correctAnswers,
      correct_rate: totalAnswers > 0 ? (correctAnswers / totalAnswers * 100).toFixed(2) + '%' : '0%'
    };
  }

  // Lấy thống kê câu trả lời theo trận đấu
  static async getAnswersStatsByMatch(matchId) {
    const totalAnswers = await Answer.count({
      where: { match_id: matchId }
    });

    const correctAnswers = await Answer.count({
      where: { 
        match_id: matchId,
        is_correct: true
      }
    });

    // Lấy số lượng các thí sinh đã trả lời
    const contestantCount = await Answer.count({
      distinct: true,
      col: 'contestant_id',
      where: { match_id: matchId }
    });

    return {
      match_id: matchId,
      total_answers: totalAnswers,
      correct_answers: correctAnswers,
      contestant_count: contestantCount,
      correct_rate: totalAnswers > 0 ? (correctAnswers / totalAnswers * 100).toFixed(2) + '%' : '0%'
    };
  }
}

module.exports = AnswerService;
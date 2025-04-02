const {
  Answer,
  Contestant,
  Question,
  Match,
  MatchContestant,
} = require("../models");
const matchContestantService = require("../services/matchContestantService");
const contestantService = require("../services/contestantService");
const { Op, Sequelize, where } = require("sequelize");
const group = require("../models/group");
const answer = require("../models/answer");
const { raw } = require("express");

class AnswerService {
  // Lấy danh sách câu trả lời (có hỗ trợ lọc và phân trang)
  static async getAnswers(filters = {}, page = 1, limit = 20) {
    const options = {
      where: {},
      include: [
        {
          model: Contestant,
          as: "contestant",
          attributes: ["id", "fullname", "email", "status"],
        },
        {
          model: Question,
          as: "question",
          attributes: [
            "id",
            "question_text",
            "question_type",
            "correct_answer",
          ],
        },
        {
          model: Match,
          as: "match",
          attributes: ["id", "match_name", "round_name", "status"],
        },
      ],
      order: [["created_at", "DESC"]],
      offset: (page - 1) * limit,
      limit,
    };

    // Xử lý các bộ lọc
    if (filters.contestant_id)
      options.where.contestant_id = filters.contestant_id;
    if (filters.question_id) options.where.question_id = filters.question_id;
    if (filters.match_id) options.where.match_id = filters.match_id;
    if (filters.is_correct !== undefined)
      options.where.is_correct = filters.is_correct;

    const { count, rows } = await Answer.findAndCountAll(options);

    return {
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      answers: rows,
    };
  }

  // Lấy chi tiết của một câu trả lời
  static async getAnswerById(id) {
    const answer = await Answer.findByPk(id, {
      include: [
        {
          model: Contestant,
          as: "contestant",
          attributes: ["id", "fullname", "email", "status"],
        },
        {
          model: Question,
          as: "question",
          attributes: [
            "id",
            "question_text",
            "question_type",
            "correct_answer",
          ],
        },
        {
          model: Match,
          as: "match",
          attributes: ["id", "match_name", "round_name", "status"],
        },
      ],
    });

    if (!answer) {
      throw new Error("Câu trả lời không tồn tại");
    }

    return answer;
  }

  // Tạo câu trả lời mới
  static async createAnswer(answerData) {
    // Kiểm tra contestant_id có tồn tại
    const contestant = await Contestant.findByPk(answerData.contestant_id);
    if (!contestant) {
      throw new Error("Thí sinh không tồn tại");
    }

    // Kiểm tra question_id có tồn tại
    const question = await Question.findByPk(answerData.question_id);
    if (!question) {
      throw new Error("Câu hỏi không tồn tại");
    }

    // Kiểm tra match_id có tồn tại
    const match = await Match.findByPk(answerData.match_id);
    if (!match) {
      throw new Error("Trận đấu không tồn tại");
    }

    // Kiểm tra xem thí sinh đã trả lời câu hỏi này trong trận đấu chưa
    const existingAnswer = await Answer.findOne({
      where: {
        contestant_id: answerData.contestant_id,
        question_id: answerData.question_id,
        match_id: answerData.match_id,
      },
    });

    if (existingAnswer) {
      throw new Error("Thí sinh đã trả lời câu hỏi này trong trận đấu");
    }

    return await Answer.create(answerData);
  }

  // Cập nhật câu trả lời
  static async updateAnswer(id, answerData) {
    const answer = await Answer.findByPk(id);

    if (!answer) {
      throw new Error("Câu trả lời không tồn tại");
    }

    // Kiểm tra các khóa ngoại nếu được cập nhật
    if (answerData.contestant_id) {
      const contestant = await Contestant.findByPk(answerData.contestant_id);
      if (!contestant) {
        throw new Error("Thí sinh không tồn tại");
      }
    }

    if (answerData.question_id) {
      const question = await Question.findByPk(answerData.question_id);
      if (!question) {
        throw new Error("Câu hỏi không tồn tại");
      }
    }

    if (answerData.match_id) {
      const match = await Match.findByPk(answerData.match_id);
      if (!match) {
        throw new Error("Trận đấu không tồn tại");
      }
    }

    await answer.update(answerData);
    return answer;
  }

  // Xóa tất cả câu trả lời của một câu hỏi
  static async deleteAnswersByQuestionId(questionId) {
    await Answer.destroy({ where: { question_id: questionId } });
    return { message: "Đã xóa tất cả câu trả lời cho câu hỏi này" };
  }
  // Xóa câu trả lời
  static async deleteAnswer(id) {
    const answer = await Answer.findByPk(id);

    if (!answer) {
      throw new Error("Câu trả lời không tồn tại");
    }

    await answer.destroy();
    return { message: "Đã xóa câu trả lời thành công" };
  }

  // Lấy tất cả câu trả lời của một thí sinh
  static async getAnswersByContestantId(contestantId) {
    const answers = await Answer.findAll({
      where: { contestant_id: contestantId },
      include: [
        {
          model: Question,
          as: "question",
          attributes: ["id", "question_text", "question_type"],
        },
        {
          model: Match,
          as: "match",
          attributes: ["id", "match_name", "round_name"],
        },
      ],
      order: [["created_at", "DESC"]],
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
          as: "contestant",
          attributes: ["id", "fullname", "email"],
        },
        {
          model: Match,
          as: "match",
          attributes: ["id", "match_name", "round_name"],
        },
      ],
      order: [["created_at", "DESC"]],
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
          as: "contestant",
          attributes: ["id", "fullname", "email", "group_id"],
        },
        {
          model: Question,
          as: "question",
          attributes: [
            "id",
            "question_text",
            "question_type",
            "question_order",
          ],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    return answers;
  }

  // Tính tỷ lệ trả lời đúng cho một câu hỏi
  static async getCorrectRateByQuestionId(questionId) {
    const totalAnswers = await Answer.count({
      where: { question_id: questionId },
    });

    const correctAnswers = await Answer.count({
      where: {
        question_id: questionId,
        is_correct: true,
      },
    });

    return {
      question_id: questionId,
      total_answers: totalAnswers,
      correct_answers: correctAnswers,
      correct_rate:
        totalAnswers > 0
          ? ((correctAnswers / totalAnswers) * 100).toFixed(2) + "%"
          : "0%",
    };
  }

  // Tính tỷ lệ trả lời đúng cho một thí sinh
  static async getCorrectRateByContestantId(contestantId, matchId = null) {
    const whereClause = { contestant_id: contestantId };
    if (matchId) whereClause.match_id = matchId;

    const totalAnswers = await Answer.count({
      where: whereClause,
    });

    const correctAnswers = await Answer.count({
      where: {
        ...whereClause,
        is_correct: true,
      },
    });

    return {
      contestant_id: contestantId,
      match_id: matchId,
      total_answers: totalAnswers,
      correct_answers: correctAnswers,
      correct_rate:
        totalAnswers > 0
          ? ((correctAnswers / totalAnswers) * 100).toFixed(2) + "%"
          : "0%",
    };
  }

  // Lấy thống kê câu trả lời theo trận đấu
  static async getAnswersStatsByMatch(matchId) {
    const totalAnswers = await Answer.count({
      where: { match_id: matchId },
    });

    const correctAnswers = await Answer.count({
      where: {
        match_id: matchId,
        is_correct: true,
      },
    });

    // Lấy số lượng các thí sinh đã trả lời
    const contestantCount = await Answer.count({
      distinct: true,
      col: "contestant_id",
      where: { match_id: matchId },
    });

    return {
      match_id: matchId,
      total_answers: totalAnswers,
      correct_answers: correctAnswers,
      contestant_count: contestantCount,
      correct_rate:
        totalAnswers > 0
          ? ((correctAnswers / totalAnswers) * 100).toFixed(2) + "%"
          : "0%",
    };
  }

  static async getTop20byMatch(match_id, limit = 20) {
    const top20 = await MatchContestant.findAll({
      attributes: ["eliminated_at_question_order", "registration_number"],
      where: { match_id: match_id, status: "Qua vòng" },
      include: [
        {
          model: Contestant,
          as: "contestant",
          attributes: ["fullname", "class"],
        },
      ],
      raw: true,
      nest: true,
    });
    return top20.map((item) => ({
      eliminated_at_question_order: item.eliminated_at_question_order,
      fullname: item.contestant.fullname,
      class: item.contestant.class,
      registration_number: item.registration_number,
    }));
  }

  static async getCorrectContestantsByQuestion(match_id) {
    const list = await Answer.findAll({
      attributes: ["score"],
      where: { is_correct: true, match_id: match_id },
      include: [
        {
          model: Contestant,
          as: "contestant",
          attributes: ["fullname", "class", "id"],
          include: [
            {
              model: MatchContestant,
              as: "matchContestants",
              attributes: ["registration_number"],
            },
          ],
        },
        {
          model: Question,
          as: "question",
          attributes: ["question_order"],
          where: { question_order: 12 },
        },
      ],
      raw: true,
      nest: true,
    });
    return list.map((item) => ({
      id: item.contestant.id,
      fullname: item.contestant.fullname,
      class: item.contestant.class,
      question_order: item.question.question_order,
      registration_number: item.contestant.matchContestants.registration_number,
    }));
  }

  //
  static async createAnswerByMatch(match_id, question_id, question_order) {
    // Xóa tất cả câu trả lời *của câu hỏi này* trong trận đấu
    await AnswerService.deleteAnswersByQuestionId(question_id);

    // Tạo câu trả lời đúng cho thí sinh có trạng thái "Đang thi"
    const dangthi = await matchContestantService.getListContestantStatusByMatch(
      match_id,
      "Đang thi"
    );

    for (const contestant of dangthi) {
      await Answer.create({
        score: 1,
        is_correct: true,
        contestant_id: contestant.contestant_id,
        question_id: question_id,
        match_id: match_id,
      });
    }

    // Tạo câu trả lời sai cho thí sinh có trạng thái "Loại" *của câu hỏi này*
    const biLoai = await contestantService.getEliminatedContestantsByQuestion(
      match_id,
      question_order
    );
    // return { match_id, question_id };
    // return `bị loại ở câu hỏi ${question_order}: ${biLoai
    //   .map((c) => c.id)
    //   .join(", ")}`;
    for (const contestant of biLoai) {
      await Answer.create({
        score: 0,
        is_correct: false,
        contestant_id: contestant.id,
        question_id: question_id,
        match_id: match_id,
      });
    }

    //return `match_id: ${match_id}, question_id: ${question_id}, question_order: ${question_order}`;
    return `Đã cập nhật điểm cho ${dangthi.length} thí sinh có đáp án đúng và ${biLoai.length} thí sinh có đáp án sai`;
  }
  static async getCorrectAnswersCount(match_id) {
    const results = await Question.findAll({
      attributes: [
        ["question_order", "question_order"],
        [
          Sequelize.fn(
            "IFNULL",
            Sequelize.fn("COUNT", Sequelize.col("answers.id")),
            0
          ),
          "correct_count",
        ],
      ],
      include: [
        {
          model: Answer,
          as: "answers",
          attributes: [],
          required: false, // LEFT JOIN để không loại bỏ câu hỏi không có đáp án đúng
          where: { is_correct: 1 }, // Chỉ đếm đáp án đúng
        },
      ],
      where: { match_id: match_id }, // Chỉ lấy câu hỏi thuộc trận đấu này
      group: ["question_order"],
      order: [["question_order", "ASC"]],
      raw: true,
    });

    return results;
  }

  // Lấy số câu đúng tho classass
  static async getCorrectAnswersCountByClass(match_id) {
    const results = await Answer.findAll({
      attributes: [
        [Sequelize.col("contestant.class"), "class"],
        [Sequelize.fn("COUNT", Sequelize.col("Answer.id")), "correct_count"],
      ],
      include: [
        {
          model: Contestant,
          as: "contestant",
          attributes: [],
        },
      ],
      where: { is_correct: 1, match_id: match_id },
      group: ["contestant.class"],
      order: [[Sequelize.col("contestant.class"), "ASC"]],
      raw: true,
    });
    return results;
  }
}

module.exports = AnswerService;

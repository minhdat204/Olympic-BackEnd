const { io } = require('../socketManager');

// gửi câu hỏi của trận đấu đến client truyền vào matchId, question_order
const emitQuestion = async (matchId, question_order, question) => {
    console.log(`🚀 Emitting event to match_${matchId} with question_order: ${question_order}`);
    io.to(`match_${matchId}`).emit('question', {
        matchId,
        question_order,
        question
    });
};

module.exports = {
    emitQuestion
};
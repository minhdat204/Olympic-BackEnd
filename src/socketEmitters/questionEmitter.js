// questionEmitter.js
import { getIO } from '../socketManager.js';

const emitQuestion = async (matchId, question_order, question) => {
  const io = getIO();
  console.log(`🚀 Emitting event to match_${matchId} with question_order: ${question_order}`);
  io.to(`match_${matchId}`).emit('question', {
    matchId,
    question_order,
    question
  });
};

// gửi time_left qua màn hình chiếu
const emitTimeLeft = async (matchId, timeLeft) => {
  const io = getIO();
  io.to(`match_${matchId}`).emit('time_left_reset', {
    matchId,
    timeLeft
  });
};

export { emitQuestion, emitTimeLeft };
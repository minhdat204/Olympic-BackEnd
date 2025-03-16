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

export { emitQuestion };
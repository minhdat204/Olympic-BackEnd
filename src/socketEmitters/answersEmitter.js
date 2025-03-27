const { getIO } = require("../socketManager");
const answersEmitter = async (match_id, status) => {
  const io = getIO();
  console.log(status);
  io.to(`match_${match_id}`).emit("answer_emit", { status });
};
module.exports = { answersEmitter };

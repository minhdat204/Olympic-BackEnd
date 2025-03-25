const { getIO } = require("../socketManager");
//gửi API lấy total thí sinh và thí sinh còn lại (status = đang thi)
const emitTotalContestants = async (
  matchId,
  totalContestants,
  remainingContestants
) => {
  const io = getIO();
  io.to(`match_${matchId}`).emit("total_contestants", {
    matchId,
    totalContestants,
    remainingContestants,
  });
};

//gửi API lấy danh sách thí sinh theo trạng thái
const emitContestants = async (matchId, contestants) => {
  const io = getIO();
  io.to(`match_${matchId}`).emit("contestants", {
    matchId,
    contestants,
  });
};
const emitContestantsjudge_id = async (matchId, judge_id, contestants) => {
  const io = getIO();
  console.log(contestants);
  io.to(`match_${matchId}`).emit("contestants_judge_id", {
    matchId,
    judge_id,
    contestants,
  });
};

module.exports = {
  emitTotalContestants,
  emitContestants,
  emitContestantsjudge_id,
};

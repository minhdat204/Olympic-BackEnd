const { getIO } = require("../socketManager");
const ContestantService = require('../services/contestantService');
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
  // console.log(contestants);
  io.to(`match_${matchId}`).emit("contestants", {
    matchId,
    contestants,
  });
};
const emitContestantsjudge_id = async (matchId, judge_id, contestants) => {
  const io = getIO();
  // console.log(contestants);
  io.to(`match_${matchId}`).emit("contestants_judge_id", {
    matchId,
    judge_id,
    contestants,
  });
};

const emitContestantsAdmin = async (matchId, status) => {
  const io = getIO();
  // console.log(status, matchId);
  io.to(`match_${matchId}`).emit("contestants_admin", { matchId, status });
};

const emitEliminatedContestants = async (matchId, contestants) => {
  const io = getIO();
  // API lấy total thí sinh và thí sinh còn lại trong trận hiện tại
  const constestantTotal = await ContestantService.getContestantTotal(matchId);
  io.emit("eliminated_contestants", {
    matchId,
    contestants,
    constestantTotal
  });
};

module.exports = {
  emitTotalContestants,
  emitContestants,
  emitContestantsjudge_id,
  emitContestantsAdmin,
  emitEliminatedContestants,
};

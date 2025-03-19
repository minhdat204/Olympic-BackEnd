const { getIO } = require('../socketManager');
//gửi API lấy total thí sinh và thí sinh còn lại (status = đang thi)
const emitTotalContestants = async (matchId, totalContestants, remainingContestants) => {
    const io = getIO();
    io.to(`match_${matchId}`).emit('total_contestants', {
      matchId,
      totalContestants,
      remainingContestants
    });
}
  
//gửi API lấy danh sách thí sinh theo trạng thái
const emitContestants = async (matchId, contestants) => {
    const io = getIO();
    io.to(`match_${matchId}`).emit('contestants', {
        matchId,
        contestants
    });
}

module.exports = {
    emitTotalContestants,
    emitContestants
};
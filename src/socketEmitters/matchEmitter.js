const { getIO } = require("../socketManager");

// các hàm emit event
const emitMatchStatusUpdate = async (matchId, newStatus) => {
  const io = getIO();
  console.log(
    `🚀 Emitting event to match_${matchId} with status: ${newStatus}`
  );
  io.to(`match_${matchId}`).emit("match_status_update", {
    matchId,
    newStatus,
  });
};

const emitGoldWinUpdate = async (match_id, info) => {
  const io = getIO();
  console.log(info);
  io.to(`match_${match_id}`).emit("update_win_gold", { info });
};

module.exports = {
  emitMatchStatusUpdate,
  emitGoldWinUpdate,
};

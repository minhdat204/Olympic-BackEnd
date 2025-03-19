const { getIO } = require('../socketManager');

// các hàm emit event
const emitMatchStatusUpdate = async (matchId, newStatus) => {
    console.log(`🚀 Emitting event to match_${matchId} with status: ${newStatus}`);
    io.to(`match_${matchId}`).emit('match_status_update', {
        matchId,
        newStatus
    });
};

module.exports = {
    emitMatchStatusUpdate
};
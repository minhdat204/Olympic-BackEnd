const handleMatchSockets = (io, socket) => {
    // Khi client tham gia vào một trận đấu
    socket.on('join_match', (matchId) => {
        console.log(`📢 Client ${socket.id} joined match_${matchId}`);

        // Rời khỏi tất cả phòng cũ trước khi vào phòng mới
        socket.rooms.forEach((room) => {
        if (room.startsWith('match_')) {
            socket.leave(room);
        }
        });

        socket.join(`match_${matchId}`);
    });

    // Khi client rời khỏi một trận đấu
    socket.on('leave_match', (matchId) => {
        console.log(`📢 Client ${socket.id} left match_${matchId}`);
        socket.leave(`match_${matchId}`);
    });
};

module.exports = handleMatchSockets;
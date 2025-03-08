const handleMatchSockets = (io, socket) => {
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
};

module.exports = handleMatchSockets;
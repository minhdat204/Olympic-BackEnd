

const handleQuestionSockets = (io, socket) => {
    socket.on('show_answer', (matchId) => {
        console.log(`📢 Client ${socket.id} requested to show answer for match_${matchId}`);
        io.to(`match_${matchId}`).emit('show_answer');
    });

    socket.on('show_question', (matchId) => {
        console.log(`📢 Client ${socket.id} requested to show question for match_${matchId}`);
        io.to(`match_${matchId}`).emit('show_question');
    });

};


module.exports = { handleQuestionSockets };
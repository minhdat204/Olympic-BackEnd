

const handleQuestionSockets = (io, socket) => {
    socket.on('show_answer', (matchId) => {
        console.log(`📢 Client ${socket.id} requested to show answer for match_${matchId}`);
        io.to(`match_${matchId}`).emit('show_answer');
    });

    socket.on('show_question', (matchId) => {
        console.log(`📢 Client ${socket.id} requested to show question for match_${matchId}`);
        io.to(`match_${matchId}`).emit('show_question');
    });

    socket.on('show_intro', (matchId) => {
        console.log(`📢 Client ${socket.id} requested to show intro for match_${matchId}`);
        io.to(`match_${matchId}`).emit('show_intro');
    });

    socket.on('show_question_intro', (matchId) => {
        console.log(`📢 Client ${socket.id} requested to show question intro for match_${matchId}`);
        io.to(`match_${matchId}`).emit('show_question_intro');
    });
    

};


module.exports = { handleQuestionSockets };
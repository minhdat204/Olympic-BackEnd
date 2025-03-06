module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);
  
      // Tham gia phòng trận đấu
      socket.on('joinMatch', (matchId) => {
        socket.join(`match_${matchId}`);
      });
  
      // Admin chọn câu hỏi
      socket.on('selectQuestion', ({ matchId, questionId }) => {
        io.to(`match_${matchId}`).emit('questionSelected', { questionId });
      });
  
      // Trọng tài gửi loại thí sinh
      socket.on('submitElimination', ({ matchId, contestantId }) => {
        io.to(`match_${matchId}`).emit('eliminationSubmitted', { contestantId });
      });
  
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
  };
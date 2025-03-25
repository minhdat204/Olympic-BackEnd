const handleDisplaySockets = (io, socket) => {
    socket.on('change_display', (data) => {
      const { type, matchId, payload } = data;
      console.log(`📺 Client ${socket.id} changed display to ${type} for match_${matchId}`);
      
      // Forward to all clients in the match room
      io.emit('change_display', { type, payload });
    });

    // gửi sơ đồ thí sinh lên
    socket.on('send_contestant_chart', (matchId) => {
      console.log(`📺 Client ${socket.id} changed display to contestant chart for match_${matchId}`);
      
      // Forward to all clients in the match room
      io.emit('send_contestant_chart', matchId);
    });

  };
  
  module.exports = { handleDisplaySockets };
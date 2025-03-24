const handleDisplaySockets = (io, socket) => {
    socket.on('change_display', (data) => {
      const { type, matchId, payload } = data;
      console.log(`📺 Client ${socket.id} changed display to ${type} for match_${matchId}`);
      
      // Forward to all clients in the match room
      io.emit('change_display', { type, payload });
    });
  };
  
  module.exports = { handleDisplaySockets };
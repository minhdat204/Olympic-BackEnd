const ContestantService = require('../services/contestantService');

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

    // Import at the top of your file

    socket.on('eliminated_contestants', async (matchId) => {
      console.log(`📺 Client ${socket.id} changed display to eliminated contestants for match_${matchId}`);
      
      try {
      // Get contestants by match ID using the service
      const contestants = await ContestantService.getContestantsByMatchId(matchId);
      // API lấy total thí sinh và thí sinh còn lại trong trận hiện tại
      const constestantTotal = await ContestantService.getContestantTotal(matchId);
      
      // Forward the contestants data to all clients in the match room
      io.emit('eliminated_contestants', { matchId, contestants, constestantTotal });
      } catch (error) {
      console.error(`Error fetching contestants for match ${matchId}:`, error);
      socket.emit('error', { message: 'Failed to fetch contestants data' });
      }
    });

  };
  
  module.exports = { handleDisplaySockets };
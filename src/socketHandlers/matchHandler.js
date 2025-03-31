const handleMatchSockets = (io, socket) => {
  // Khi client tham gia vào một trận đấu
  socket.on("join_match", (matchId) => {
    console.log(`📢 Client ${socket.id} attempting to join match_${matchId}`);
    console.log("Received matchId:", matchId, "type:", typeof matchId);

    // If matchId is an object, extract the value
    const roomId = typeof matchId === "object" ? matchId.matchId : matchId;

    socket.join(`match_${roomId}`);
    console.log(`Room joined: match_${roomId}`);
    console.log("Current rooms:", Array.from(socket.rooms));
  });
  // Khi client rời khỏi một trận đấu
  socket.on("leave_match", (matchId) => {
    console.log(`📢 Client ${socket.id} left match_${matchId}`);
    socket.leave(`match_${matchId}`);
  });

  /**
   * Được gửi từ RescueControl.jsx
   * @param data {Object}
   *  matchId,
      rescueNumber,
      questionId: questions[currentQuestionIndex].id,
   */
  socket.on("rescue-updated", (data) => {
    console.log(`📢 Client ${socket.id} updated rescue for match_${data.matchId}`);
    /**
     * gửi cho màn hình chiếu: Show.jsx
     */
    io.emit("rescue-updated", data);
  });
};

module.exports = handleMatchSockets;

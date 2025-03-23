const handleScreenSokets = (io, socket) => {
  /**
   * Lắng nghe sự kiện từ màn hình điều khiển
   * */
  socket.on("control_screen", (data) => {
    io.to(`match_${data.matchId}`).emit("screens", data);
  });
};

module.exports = { handleScreenSokets };

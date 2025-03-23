const handleVieoSokets = (io, socket) => {
  /**
   * Lắng nghe sự kiện từ màn hình điều khiển
   * */
  socket.on("video_controls", (data) => {
    console.log(data);
    io.to(`match_${data.matchId}`).emit("video_controls_action", data);
  });
};

module.exports = { handleVieoSokets };

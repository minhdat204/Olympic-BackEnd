const handleScreenSokets = (io, socket) => {
  /**
   * Lắng nghe sự kiện từ màn hình điều khiển
   * */
  socket.on("control_screen", (data) => {
    console.log(data);
    io.emit("screens", data);
  });
  socket.on("control_audio_question_emit", (data) => {
    console.log(data);
    io.emit("control_audio_question_on", data);
  });
};

module.exports = { handleScreenSokets };

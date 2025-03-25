const handleScreenSokets = (io, socket) => {
  /**
   * Lắng nghe sự kiện từ màn hình điều khiển
   * */
  socket.on("control_screen", (data) => {
    console.log(data);
    io.emit("screens", data);
  });
};

module.exports = { handleScreenSokets };

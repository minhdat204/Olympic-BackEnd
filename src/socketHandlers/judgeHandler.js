const judgeHandler = (io, socket) => {
  socket.on("judge_id", (data) => {
    io.emit("send_judge_id", data);
  });
};

module.exports = { judgeHandler };

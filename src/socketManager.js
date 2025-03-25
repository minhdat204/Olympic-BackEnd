const handleMatchSockets = require("./socketHandlers/matchHandler");
const { handleQuestionSockets } = require("./socketHandlers/questionHandler");
const { handleTimerSockets } = require("./socketHandlers/timerHandler");
const { handleScreenSokets } = require("./socketHandlers/screenHandler");
const { handleVieoSokets } = require("./socketHandlers/videoHandler");
const { handleDisplaySockets } = require("./socketHandlers/displayHandler");
const { judgeHandler } = require("./socketHandlers/judgeHandler");
let ioInstance = null;

function initializeSocket(io) {
  ioInstance = io;
  console.log("✅ Socket.io initialized");

  io.on("connection", (socket) => {
    console.log(`🔥 Client connected: ${socket.id}`);
    handleMatchSockets(io, socket);
    handleQuestionSockets(io, socket);
    handleTimerSockets(io, socket);
    handleScreenSokets(io, socket);
    handleVieoSokets(io, socket);
    handleDisplaySockets(io, socket);
    judgeHandler(io, socket);

    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });
}

function getIO() {
  if (!ioInstance) {
    throw new Error(
      "Socket.io chưa được khởi tạo! Hãy gọi initializeSocket trước."
    );
  }
  return ioInstance;
}

module.exports = { initializeSocket, getIO };

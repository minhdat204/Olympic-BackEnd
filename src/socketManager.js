import handleMatchSockets from './socketHandlers/matchHandler.js';
import { handleQuestionSockets, handleTimerSockets } from './socketHandlers/questionHandler.js';

let ioInstance = null;

function initializeSocket(io) {
  ioInstance = io;
  console.log('✅ Socket.io initialized');

  io.on('connection', (socket) => {
    console.log(`🔥 Client connected: ${socket.id}`);
    handleMatchSockets(io, socket);
    handleQuestionSockets(io, socket);
    handleTimerSockets(io, socket);

    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });
}

function getIO() {
  if (!ioInstance) {
    throw new Error('Socket.io chưa được khởi tạo! Hãy gọi initializeSocket trước.');
  }
  return ioInstance;
}

export { initializeSocket, getIO };
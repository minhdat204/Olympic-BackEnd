import handleMatchSockets from './socketHandlers/matchHandler.js';
let ioInstance = null; // Biến global để lưu io

function initializeSocket(io) {
  ioInstance = io;

  io.on('connection', (socket) => {
    console.log(`🔥 Client connected: ${socket.id}`);

    // Xử lý các sự kiện socket
    handleMatchSockets(io, socket);

    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });
}

export { initializeSocket, ioInstance as io };
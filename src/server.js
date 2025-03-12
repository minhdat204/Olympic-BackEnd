require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const socketIo = require('socket.io');
const { initializeSocket } = require('./socketManager');
const cors = require('cors'); // Import thư viện cors
const authRoutes = require('./routes/auth');
const matchRoutes = require('./routes/match'); 
const contestantRoutes = require('./routes/contestant');

const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Cho phép kết nối từ bất kỳ frontend nào (hoặc sửa thành domain cụ thể)
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/contestants', contestantRoutes);

initializeSocket(io);

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
/*
Hàm để test kết nối tới database
 */
const { sequelize } = require('./models'); // Import từ models/index.js

async function testDatabaseConnection() {
  try {
    // Xác thực kết nối
    await sequelize.authenticate();
    console.log('✅ Kết nối database thành công!');

    // Test raw query đơn giản
    const [result] = await sequelize.query('SELECT 1 + 1 AS solution');
    console.log('🔢 Kết quả test query:', result[0].solution); // Output: 2

  } catch (error) {
    console.error('❌ Lỗi kết nối database:', error);
  } finally {
    // Đóng kết nối
    await sequelize.close();
    console.log('📴 Đã đóng kết nối database.');
  }
}

// Chạy hàm test
testDatabaseConnection();
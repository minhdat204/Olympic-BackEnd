const jwt = require('jsonwebtoken');  // import thư viện jsonwebtoken
const { blacklistedTokens } = require('../services/authService'); // Import từ service

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // lấy token từ header

  if (!token) return res.status(401).json({ message: 'No token provided' }); // nếu không có token thì trả về lỗi

  if (blacklistedTokens.has(token)) {
    return res.status(401).json({ message: "Token expired, please login again" });   // nếu token đã logout thì trả về lỗi
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // giải mã token
    req.user = decoded;  // lưu thông tin user vào req
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
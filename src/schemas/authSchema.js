// Định nghĩa các schema cho việc đăng nhập và đăng ký
const Joi = require('joi');

const loginSchema = Joi.object({
  username: Joi.string().required(),         // Tên người dùng là chuỗi, bắt buộc
  password: Joi.string().min(6).required(),  // Mật khẩu ít nhất 6 ký tự, bắt buộc
});

module.exports = { loginSchema };
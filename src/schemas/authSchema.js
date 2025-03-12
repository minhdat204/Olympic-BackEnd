// Định nghĩa các schema cho việc đăng nhập và đăng ký
const Joi = require('joi');
// Định nghĩa các schema cho việc đăng nhập và đăng ký

const loginSchema = Joi.object({
  usernameOrEmail: Joi.alternatives().try(
    Joi.string().email().messages({
      'string.email': 'Định dạng email không hợp lệ',
      'string.empty': 'Vui lòng nhập email'
    }),
    Joi.string().min(3).max(30).messages({
      'string.min': 'Username phải có ít nhất {#limit} ký tự',
      'string.max': 'Username không được vượt quá {#limit} ký tự',
      'string.empty': 'Vui lòng nhập username'
    })
  ).required().messages({
    'any.required': 'Vui lòng nhập username hoặc email'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Vui lòng nhập mật khẩu',
    'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự',
    'any.required': 'Vui lòng nhập mật khẩu'
  }),
});

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),  // Username từ 3-30 ký tự
  email: Joi.string().email().required(),            // Email phải đúng định dạng
  password: Joi.string().min(6).required(),          // Mật khẩu ít nhất 6 ký tự
});

module.exports = { loginSchema, registerSchema };
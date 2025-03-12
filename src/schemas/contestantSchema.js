const Joi = require('joi');

const createContestantSchema = Joi.object({
  fullname: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Vui lòng nhập họ tên',
    'string.min': 'Họ tên phải có ít nhất {#limit} ký tự',
    'string.max': 'Họ tên không được vượt quá {#limit} ký tự',
    'any.required': 'Vui lòng nhập họ tên'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Vui lòng nhập email',
    'string.email': 'Email không đúng định dạng',
    'any.required': 'Vui lòng nhập email'
  }),
  class: Joi.string().max(20).required().messages({
    'string.empty': 'Vui lòng nhập lớp',
    'string.max': 'Lớp không được vượt quá {#limit} ký tự',
    'any.required': 'Vui lòng nhập lớp'
  }),
  class_year: Joi.number().integer().required().messages({
    'number.base': 'Khóa phải là số nguyên',
    'any.required': 'Vui lòng nhập khóa'
  }),
  registration_number: Joi.number().integer().allow(null),
  qualifying_score: Joi.number().integer().min(0).max(100).allow(null),
  current_question: Joi.number().integer().default(-1),
  group_id: Joi.number().integer().allow(null),
  status: Joi.string().valid('not_started', 'in_progress', 'eliminated', 'pending_revival').default('not_started')
});

const updateContestantSchema = Joi.object({
  fullname: Joi.string().min(3).max(50).messages({
    'string.min': 'Họ tên phải có ít nhất {#limit} ký tự',
    'string.max': 'Họ tên không được vượt quá {#limit} ký tự'
  }),
  email: Joi.string().email().messages({
    'string.email': 'Email không đúng định dạng'
  }),
  class: Joi.string().max(20),
  class_year: Joi.number().integer(),
  registration_number: Joi.number().integer().allow(null),
  qualifying_score: Joi.number().integer().min(0).max(100).allow(null),
  current_question: Joi.number().integer(),
  group_id: Joi.number().integer().allow(null),
  status: Joi.string().valid('not_started', 'in_progress', 'eliminated', 'pending_revival')
});

module.exports = {
  createContestantSchema,
  updateContestantSchema
};
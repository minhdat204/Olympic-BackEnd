const Joi = require('joi');

const createAnswerSchema = Joi.object({
  is_correct: Joi.boolean().required().messages({
    'boolean.base': 'Trạng thái đúng/sai phải là kiểu boolean',
    'any.required': 'Vui lòng nhập trạng thái đúng/sai'
  }),
  contestant_id: Joi.number().integer().required().messages({
    'number.base': 'ID thí sinh phải là số nguyên',
    'any.required': 'Vui lòng nhập ID thí sinh'
  }),
  question_id: Joi.number().integer().required().messages({
    'number.base': 'ID câu hỏi phải là số nguyên',
    'any.required': 'Vui lòng nhập ID câu hỏi'
  }),
  match_id: Joi.number().integer().required().messages({
    'number.base': 'ID trận đấu phải là số nguyên',
    'any.required': 'Vui lòng nhập ID trận đấu'
  })
});

const updateAnswerSchema = Joi.object({
  is_correct: Joi.boolean().messages({
    'boolean.base': 'Trạng thái đúng/sai phải là kiểu boolean'
  }),
  contestant_id: Joi.number().integer().messages({
    'number.base': 'ID thí sinh phải là số nguyên'
  }),
  question_id: Joi.number().integer().messages({
    'number.base': 'ID câu hỏi phải là số nguyên'
  }),
  match_id: Joi.number().integer().messages({
    'number.base': 'ID trận đấu phải là số nguyên'
  })
});

module.exports = {
  createAnswerSchema,
  updateAnswerSchema
};
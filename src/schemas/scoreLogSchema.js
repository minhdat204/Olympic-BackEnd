const Joi = require('joi');

const createScoreLogSchema = Joi.object({
  score: Joi.number().integer().required().messages({
    'number.base': 'Điểm phải là số nguyên',
    'any.required': 'Vui lòng nhập điểm'
  }),
  rescued: Joi.boolean().default(false).messages({
    'boolean.base': 'Trường rescued phải là boolean'
  }),
  contestant_id: Joi.number().integer().required().messages({
    'number.base': 'ID thí sinh phải là số nguyên',
    'any.required': 'Vui lòng nhập ID thí sinh'
  }),
  match_id: Joi.number().integer().required().messages({
    'number.base': 'ID trận đấu phải là số nguyên',
    'any.required': 'Vui lòng nhập ID trận đấu'
  })
});

const updateScoreLogSchema = Joi.object({
  score: Joi.number().integer().messages({
    'number.base': 'Điểm phải là số nguyên'
  }),
  rescued: Joi.boolean().messages({
    'boolean.base': 'Trường rescued phải là boolean'
  }),
  contestant_id: Joi.number().integer().messages({
    'number.base': 'ID thí sinh phải là số nguyên'
  }),
  match_id: Joi.number().integer().messages({
    'number.base': 'ID trận đấu phải là số nguyên'
  })
});

module.exports = {
  createScoreLogSchema,
  updateScoreLogSchema
};
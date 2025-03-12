const Joi = require('joi');

const createGroupSchema = Joi.object({
  group_name: Joi.string().max(100).required().messages({
    'string.empty': 'Vui lòng nhập tên nhóm',
    'string.max': 'Tên nhóm không được vượt quá {#limit} ký tự',
    'any.required': 'Vui lòng nhập tên nhóm'
  }),
  match_id: Joi.number().integer().allow(null).messages({
    'number.base': 'ID trận đấu phải là số nguyên'
  }),
  judge_id: Joi.number().integer().allow(null).messages({
    'number.base': 'ID trọng tài phải là số nguyên'
  })
});

const updateGroupSchema = Joi.object({
  group_name: Joi.string().max(100).messages({
    'string.max': 'Tên nhóm không được vượt quá {#limit} ký tự'
  }),
  match_id: Joi.number().integer().allow(null).messages({
    'number.base': 'ID trận đấu phải là số nguyên'
  }),
  judge_id: Joi.number().integer().allow(null).messages({
    'number.base': 'ID trọng tài phải là số nguyên'
  })
});

const addContestantsSchema = Joi.object({
  contestant_ids: Joi.array().items(Joi.number().integer().required()).min(1).required().messages({
    'array.min': 'Phải có ít nhất một thí sinh',
    'any.required': 'Vui lòng chọn thí sinh để thêm vào nhóm'
  })
});

module.exports = {
  createGroupSchema,
  updateGroupSchema,
  addContestantsSchema
};
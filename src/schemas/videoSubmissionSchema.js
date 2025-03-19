const Joi = require('joi');

const createVideoSubmissionSchema = Joi.object({
  name: Joi.string().max(255).required().messages({
    'string.empty': 'Vui lòng nhập tên video',
    'string.max': 'Tên video không được vượt quá {#limit} ký tự',
    'any.required': 'Vui lòng nhập tên video'
  }),
  type: Joi.string().valid('Team', 'Sponsor').required().messages({
    'string.empty': 'Vui lòng chọn loại video',
    'any.only': 'Loại video phải là Team hoặc Sponsor',
    'any.required': 'Vui lòng chọn loại video'
  }),
});

const updateVideoSubmissionSchema = Joi.object({
  name: Joi.string().max(255).optional().messages({
    'string.max': 'Tên video không được vượt quá {#limit} ký tự'
  }),
  type: Joi.string().valid('Team', 'Sponsor').optional().messages({
    'any.only': 'Loại video phải là Team hoặc Sponsor'
  }),
});

module.exports = {
  createVideoSubmissionSchema,
  updateVideoSubmissionSchema
};
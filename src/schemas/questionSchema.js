const Joi = require("joi");

const questionSchema = Joi.object({
  question_text: Joi.string().required().messages({
    "string.base": " question_text phải là chuỗi.",
    "string.empty": " question_text không được để trống.",
    "any.required": " question_text là trường bắt buộc.",
  }),

  question_intro: Joi.string().allow(null, "").messages({
    "string.base": " question_intro phải là chuỗi.",
  }),

  question_topic: Joi.string().allow(null, "").messages({
    "string.base": " question_topic phải là chuỗi.",
  }),

  question_explanation: Joi.string().allow(null, "").messages({
    "string.base": " question_explanation phải là chuỗi.",
  }),

  question_type: Joi.string()
    .valid("Trắc Nghiệm", "Hình Ảnh", "Âm Thanh", "Video", "Tự Luận")
    .required()
    .messages({
      "any.only":
        " question_type phải là một trong các giá trị: Trắc Nghiệm, Hình Ảnh, Âm Thanh, Video, Tự Luận.",
      "any.required": " question_type là trường bắt buộc.",
    }),

  media_url: Joi.string().uri().allow(null, "").messages({
    "string.uri": " media_url phải là một URL hợp lệ.",
  }),

  correct_answer: Joi.string().required().messages({
    "string.empty": " correct_answer không được để trống.",
    "any.required": " correct_answer là trường bắt buộc.",
  }),

  options: Joi.array().items(Joi.string()).required().messages({
    "array.base": " options phải là một mảng.",
    "any.required": " options là trường bắt buộc.",
  }),

  question_order: Joi.number().integer().min(1).messages({
    "number.base": " question_order phải là số nguyên.",
    "number.min": " question_order phải lớn hơn hoặc bằng 1.",
  }),

  timer: Joi.number().integer().min(5).max(300).required().messages({
    "number.base": " timer phải là số nguyên.",
    "number.min": " timer tối thiểu là 5 giây.",
    "number.max": " timer tối đa là 300 giây.",
    "any.required": " timer là trường bắt buộc.",
  }),

  time_left: Joi.number().integer().min(0).allow(null).messages({
    "number.base": " time_left phải là số nguyên.",
    "number.min": " time_left không được âm.",
  }),

  dificulty: Joi.string()
    .valid("Alpha", "Beta", "RC", "Gold")
    .required()
    .messages({
      "any.only": " dificulty chỉ nhận giá trị: Alpha, Beta, RC, Gold.",
      "any.required": " dificulty là trường bắt buộc.",
    }),

  match_id: Joi.number().integer().allow(null).messages({
    "number.base": " match_id phải là số nguyên.",
  }),
});

module.exports = { questionSchema };

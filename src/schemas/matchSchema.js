const Joi = require("joi");

const matchSchema = Joi.object({
  match_name: Joi.string().required().messages({
    "string.empty": "Tên trận đấu không được để trống.",
    "any.required": "Tên trận đấu là bắt buộc.",
  }),

  start_time: Joi.date().optional().messages({
    "date.base": "Thời gian bắt đầu phải là định dạng ngày hợp lệ.",
  }),

  end_time: Joi.date().optional().messages({
    "date.base": "Thời gian kết thúc phải là định dạng ngày hợp lệ.",
  }),

  status: Joi.string()
    .valid("UpComing", "Ongoing", "Finished")
    .required()
    .messages({
      "any.only":
        "Trạng thái chỉ có thể là 'UpComing', 'Ongoing' hoặc 'Finished'.",
      "any.required": "Trạng thái trận đấu là bắt buộc.",
    }),

  current_question_id: Joi.number().integer().min(1).optional().messages({
    "number.base": "ID câu hỏi hiện tại phải là số.",
    "number.integer": "ID câu hỏi hiện tại phải là số nguyên.",
    "number.min": "ID câu hỏi hiện tại phải lớn hơn 0.",
  }),

  rescue_1: Joi.number().integer().default(-1).messages({
    "number.base": "Rescue 1 phải là số nguyên.",
  }),

  rescue_2: Joi.number().integer().default(-1).messages({
    "number.base": "Rescue 2 phải là số nguyên.",
  }),

  plane: Joi.number().integer().default(-1).messages({
    "number.base": "Plane phải là số nguyên.",
  }),

  rescued_count_1: Joi.number().integer().default(-1).messages({
    "number.base": "Rescued Count 1 phải là số nguyên.",
  }),

  rescued_count_2: Joi.number().integer().default(-1).messages({
    "number.base": "Rescued Count 2 phải là số nguyên.",
  }),

  round_name: Joi.string()
    .valid("Vòng loại", "Tứ Kết", "Bán Kết", "Chung Kết")
    .required()
    .messages({
      "any.only":
        "Vòng đấu chỉ có thể là 'Vòng loại', 'Tứ Kết', 'Bán Kết', 'Chung Kết'.",
      "any.required": "Vòng đấu là bắt buộc.",
    }),

  gold_winner_id: Joi.number().integer().optional().messages({
    "number.base": "ID người chiến thắng phải là số nguyên.",
  }),

  created_at: Joi.date().optional(),
  updated_at: Joi.date().optional(),
});

module.exports = matchSchema;

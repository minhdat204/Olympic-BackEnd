/**
 * Validate middleware : xử lý validate dữ liệu trước khi đi vào controller
 * @param {Object} schema - Joi schema object
 */
const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validate;
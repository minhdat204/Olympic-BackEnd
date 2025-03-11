'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  questions.init({
    id: DataTypes.BIGINT,
    question_text: DataTypes.TEXT,
    question_intro: DataTypes.TEXT,
    question_topic: DataTypes.TEXT,
    question_explanation: DataTypes.TEXT,
    question_type: DataTypes.STRING,
    media_url: DataTypes.STRING,
    correct_anwer: DataTypes.TEXT,
    options: DataTypes.JSON,
    question_order: DataTypes.INTEGER,
    timer: DataTypes.INTEGER,
    time_left: DataTypes.INTEGER,
    match_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'questions',
  });
  return questions;
};
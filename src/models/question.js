'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      Question.hasMany(models.Answer, { foreignKey: 'question_id' });
      Question.hasMany(models.QuestionPackageDetail, { foreignKey: 'question_id' });
    }
  }

  Question.init(
    {
      question_text: DataTypes.TEXT,
      question_intro: DataTypes.TEXT,
      question_topic: DataTypes.TEXT,
      question_explanation: DataTypes.TEXT,
      question_type: DataTypes.STRING,
      media_url: DataTypes.STRING,
      correct_answer: DataTypes.TEXT,
      options: DataTypes.JSON,
      difficulty: DataTypes.STRING(20),
    },
    {
      sequelize,
      modelName: 'Question',
      tableName: 'questions',
      timestamps: false,
      underscored: true,
    }
  );

  return Question;
};

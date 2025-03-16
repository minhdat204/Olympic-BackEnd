'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      Question.hasMany(models.Answer, {
        foreignKey: 'question_id',
        as: 'answers'
      });
      Question.belongsTo(models.Match, {
        foreignKey: 'match_id',
        as: 'match'
      });
      Question.hasOne(models.Match, {
        foreignKey: 'current_question_id',
        as: 'match_for_question'
      });
    }
  }
  Question.init({
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    question_text: DataTypes.TEXT,
    question_intro: DataTypes.TEXT,
    question_topic: DataTypes.TEXT,
    question_explanation: DataTypes.TEXT,
    question_type: {
      type: DataTypes.ENUM("Trắc Nghiệm", "Hình Ảnh", "Âm Thanh", "Video", "Tự Luận"),
      allowNull: false
    },
    media_url: DataTypes.JSON,
    correct_answer: DataTypes.TEXT,
    options: DataTypes.JSON,
    question_order: DataTypes.TINYINT,
    timer: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    time_left: DataTypes.SMALLINT,
    dificulty: {
      type: DataTypes.ENUM("Alpha", "Beta", "RC", "Gold"),
      allowNull: false
    },
    match_id: DataTypes.SMALLINT
  }, {
    sequelize,
    modelName: 'Question',
    tableName: 'questions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
  });
  return Question;
};
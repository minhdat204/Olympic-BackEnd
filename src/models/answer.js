"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    static associate(models) {
      Answer.belongsTo(models.Contestant, {
        foreignKey: "contestant_id",
        as: "contestant",
      });
      Answer.belongsTo(models.Question, {
        foreignKey: "question_id",
        as: "question",
      });
      Answer.belongsTo(models.Match, {
        foreignKey: "match_id",
        as: "match",
      });
    }
  }
  Answer.init(
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      is_correct: DataTypes.BOOLEAN,
      score: DataTypes.TINYINT,
      contestant_id: DataTypes.SMALLINT,
      question_id: DataTypes.SMALLINT,
      match_id: DataTypes.SMALLINT,
    },
    {
      sequelize,
      modelName: "Answer",
      tableName: "answers",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true,
    }
  );
  return Answer;
};

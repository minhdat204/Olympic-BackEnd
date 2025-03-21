"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    static associate(models) {
      Match.belongsTo(models.Question, {
        foreignKey: "current_question_id",
        as: "current_question",
      });

      Match.belongsTo(models.Contestant, {
        foreignKey: "gold_winner_id",
        as: "gold_winner",
      });

      Match.hasMany(models.Group, {
        foreignKey: "match_id",
        as: "groups",
      });

      Match.hasMany(models.Question, {
        foreignKey: "match_id",
        as: "questions",
      });

      Match.hasMany(models.Score_log, {
        foreignKey: "match_id",
        as: "score_logs",
      });

      Match.hasMany(models.Answer, {
        foreignKey: "match_id",
        as: "answers",
      });

      // Quan hệ nhiều - nhiều với Contestant qua bảng MatchContestant
      Match.belongsToMany(models.Contestant, {
        through: models.MatchContestant,
        foreignKey: "match_id",
        otherKey: "contestant_id",
        as: "contestants", // ✅ Đặt alias duy nhất
      });

      Match.hasMany(models.MatchContestant, {
        foreignKey: "match_id",
        as: "matchContestants", // ✅ Đặt alias duy nhất
      });
    }
  }

  Match.init(
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      match_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM("Chưa diễn ra", "Đang diễn ra", "Đã kết thúc"),
        defaultValue: "Chưa diễn ra",
      },
      current_question_id: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        defaultValue: null,
      },
      rescue_1: {
        type: DataTypes.TINYINT,
        defaultValue: -1,
      },
      rescue_2: {
        type: DataTypes.TINYINT,
        defaultValue: -1,
      },
      plane: {
        type: DataTypes.TINYINT,
        defaultValue: -1,
      },
      rescued_count_1: {
        type: DataTypes.TINYINT,
        defaultValue: -1,
      },
      rescued_count_2: {
        type: DataTypes.TINYINT,
        defaultValue: -1,
      },
      class_names: {
        type: DataTypes.JSON,
      },
      round_name: {
        type: DataTypes.ENUM("Vòng loại", "Tứ Kết", "Bán Kết", "Chung Kết"),
        allowNull: false,
      },
      gold_winner_id: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "Match",
      tableName: "matches",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true,
    }
  );

  return Match;
};

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Contestant extends Model {
    static associate(models) {
      Contestant.belongsTo(models.Group, {
        foreignKey: "group_id",
        as: "group",
      });

      Contestant.hasMany(models.Score_log, {
        foreignKey: "contestant_id",
        as: "score_logs",
      });

      Contestant.hasMany(models.Answer, {
        foreignKey: "contestant_id",
        as: "answers",
      });

      Contestant.hasMany(models.Match, {
        foreignKey: "gold_winner_id",
        as: "matches_won",
      });

      // Kết nối với Match qua bảng trung gian MatchContestant
      Contestant.belongsToMany(models.Match, {
        through: models.MatchContestant,
        foreignKey: "contestant_id",
        otherKey: "match_id",
        as: "matches",
      });

      // Một Contestant có thể có nhiều Award
      Contestant.hasMany(models.Award, {
        foreignKey: "contestant_id",
        as: "awards",
      });
    }
  }

  Contestant.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      fullname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "contestants_email_unique",
        },
      },
      class: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      class_year: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      qualifying_score: DataTypes.TINYINT,
      group_id: DataTypes.SMALLINT,
    },
    {
      sequelize,
      modelName: "Contestant",
      tableName: "contestants",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true,
    }
  );

  return Contestant;
};

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Award extends Model {
    static associate(models) {
      // Quan hệ với bảng Question
      Award.belongsTo(models.Contestant, {
        foreignKey: "contestant_id",
        as: "contestant",
      });

      // Quan hệ với bảng Video Submission (nếu có bảng video_submissions)
      Award.belongsTo(models.VideoSubmission, {
        foreignKey: "video_submission_id",
        as: "video",
      });
    }
  }

  Award.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      awards_name: {
        type: DataTypes.ENUM(
          "Giải nhất",
          "Giải nhì",
          "Giải ba",
          "Giải video ấn tượng",
          "Giải Gold"
        ),
        allowNull: false,
      },
      question_id: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        defaultValue: null,
      },
      video_submission_id: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "Award",
      tableName: "awards",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true,
    }
  );

  return Award;
};

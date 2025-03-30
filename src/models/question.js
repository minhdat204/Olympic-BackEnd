"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      Question.hasMany(models.Answer, {
        foreignKey: "question_id",
        as: "answers",
      });
      Question.belongsTo(models.Match, {
        foreignKey: "match_id",
        as: "match",
      });
    }
  }
  Question.init(
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      question_text: DataTypes.TEXT,
      question_intro: DataTypes.TEXT,
      question_topic: DataTypes.TEXT,
      question_explanation: DataTypes.TEXT,
      question_type: {
        type: DataTypes.ENUM("Hình Ảnh", "Âm Thanh", "Video", "Tự Luận"),
        allowNull: false,
      },
      media_url: {
        type: DataTypes.JSON,
        get() {
          const value = this.getDataValue("media_url");
          if (!value) return null;

          try {
            return typeof value === "string" ? JSON.parse(value) : value;
          } catch (e) {
            return value; // Return as-is if JSON parsing fails
          }
        },
        set(value) {
          // Ensure we always store JSON strings or null
          if (value === null || value === undefined) {
            this.setDataValue("media_url", null);
          } else {
            // Always stringify unless it's already a JSON string
            const valueToStore =
              typeof value === "string" &&
              (value.startsWith("{") || value.startsWith("["))
                ? value
                : JSON.stringify(value);

            this.setDataValue("media_url", valueToStore);
          }
        },
      },
      correct_answer: DataTypes.TEXT,
      correct_answer_type: {
        type: DataTypes.ENUM(
          "Text",
          "Image",
          "Audio",
          "Video",
          "Multiple Choice"
        ),
        allowNull: false,
        defaultValue: "Text",
      },
      options: {
        type: DataTypes.JSON,
        get() {
          const value = this.getDataValue("options");
          return value
            ? typeof value === "string"
              ? JSON.parse(value)
              : value
            : [];
        },
        set(value) {
          if (value === null || value === undefined) {
            this.setDataValue("options", null);
          } else if (typeof value === "string") {
            try {
              JSON.parse(value);
              this.setDataValue("options", value);
            } catch (e) {
              this.setDataValue("options", JSON.stringify(value));
            }
          } else {
            this.setDataValue("options", JSON.stringify(value));
          }
        },
      },
      question_order: DataTypes.TINYINT,
      timer: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      time_left: DataTypes.SMALLINT,
      dificulty: {
        type: DataTypes.ENUM("Alpha", "Beta", "RC", "Gold"),
        allowNull: false,
      },
      match_id: DataTypes.SMALLINT,
    },
    {
      hooks: {
        beforeCreate: (question) => {
          // If time_left is not set, use the timer value
          if (question.time_left === null || question.time_left === undefined) {
            question.time_left = question.timer;
          }
        },
        beforeUpdate: (question) => {
          // Optional: also set time_left when timer changes and time_left is null
          if (
            question.changed("timer") &&
            (question.time_left === null || question.time_left === undefined)
          ) {
            question.time_left = question.timer;
          }
        },
      },
      sequelize,
      modelName: "Question",
      tableName: "questions",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true,
    }
  );
  return Question;
};

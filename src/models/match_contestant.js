"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MatchContestant extends Model {
    static associate(models) {
      MatchContestant.belongsTo(models.Match, {
        foreignKey: "match_id",
        as: "match", // ✅ Đặt alias duy nhất
      });

      MatchContestant.belongsTo(models.Contestant, {
        foreignKey: "contestant_id",
        as: "contestant", // ✅ Đặt alias duy nhất
      });
    }
  }

  MatchContestant.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      registration_number: {
        type: DataTypes.SMALLINT, // Sử dụng SMALLINT nếu số không quá lớn
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          "Chưa thi",
          "Đang thi",
          "Xác nhận 1",
          "Xác nhận 2",
          "Bị loại",
          "Được cứu",
          "Cấm thi",
          "Qua vòng"
        ),
        defaultValue: "Đang thi",
      },
      eliminated_at_question_order: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      match_id: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        references: {
          model: "matches",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      contestant_id: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        references: {
          model: "contestants",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "MatchContestant",
      tableName: "match_contestants",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true, // Giữ tên cột theo chuẩn snake_case
    }
  );

  return MatchContestant;
};

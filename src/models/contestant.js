'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contestant extends Model {
    static associate(models) {
      Contestant.belongsTo(models.Group, {
        foreignKey: 'group_id',
        as: 'group',
      });
      Contestant.hasMany(models.Score_log, {
        foreignKey: 'contestant_id',
        as: 'score_logs',
      });
      Contestant.hasMany(models.Answer, {
        foreignKey: 'contestant_id',
        as: 'answers',
      });
      Contestant.hasMany(models.Match, {
        foreignKey: 'gold_winner_id',
        as: 'matches',
      });
    }
  }
  Contestant.init({
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
        name: 'contestants_email_unique'
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
    registration_number: DataTypes.SMALLINT,
    qualifying_score: DataTypes.TINYINT,
    current_question: {
      type: DataTypes.TINYINT,
      defaultValue: -1,
    },
    group_id: DataTypes.SMALLINT,
    round_name: {
      type: DataTypes.ENUM("Vòng loại", "Tứ Kết", "Bán Kết", "Chung Kết"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Chưa thi", "Đang thi", "Xác nhận 1", "Chờ cứu", "Bị loại"),
      defaultValue: 'Chưa thi',
    },
  }, {
    sequelize,
    modelName: 'Contestant',
    tableName: 'contestants',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
  });
  return Contestant;
};
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Score_log extends Model {
    static associate(models) {
      Score_log.belongsTo(models.Contestant, {
        foreignKey: 'contestant_id',
        as: 'contestant'
      });
      Score_log.belongsTo(models.Match, {
        foreignKey: 'match_id',
        as: 'match'
      });
    }
  }
  Score_log.init({
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    score: DataTypes.TINYINT,
    rescued: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    contestant_id: DataTypes.SMALLINT,
    match_id: DataTypes.SMALLINT
  }, {
    sequelize,
    modelName: 'Score_log',
    tableName: 'score_logs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
  });
  return Score_log;
};
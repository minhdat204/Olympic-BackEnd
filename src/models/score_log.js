'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ScoreLog extends Model {
    static associate(models) {
      ScoreLog.belongsTo(models.Contestant, { foreignKey: 'contestant_id' });
      ScoreLog.belongsTo(models.Match, { foreignKey: 'match_id' });
    }
  }

  ScoreLog.init(
    {
      score: DataTypes.DECIMAL(10, 2),
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'ScoreLog',
      tableName: 'score_logs',
      timestamps: false,
      underscored: true,
    }
  );

  return ScoreLog;
};

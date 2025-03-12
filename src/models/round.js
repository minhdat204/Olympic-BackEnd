'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Round extends Model {
    static associate(models) {
      Round.hasMany(models.Match, { foreignKey: 'round_id' });
      Round.hasMany(models.Contestant, { foreignKey: 'current_round_id' });
    }
  }

  Round.init(
    {
      round_name: DataTypes.STRING(100),
      description: DataTypes.TEXT,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Round',
      tableName: 'rounds',
      timestamps: true,
      underscored: true,
    }
  );

  return Round;
};

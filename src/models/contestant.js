'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contestant extends Model {
    static associate(models) {
      Contestant.belongsTo(models.Round, { foreignKey: 'current_round_id' });
      Contestant.belongsTo(models.Group, { foreignKey: 'group_id' });
      Contestant.hasMany(models.Answer, { foreignKey: 'contestant_id' });
      Contestant.hasMany(models.ScoreLog, { foreignKey: 'contestant_id' });
    }
  }

  Contestant.init(
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      school: DataTypes.STRING,
      class_year: DataTypes.INTEGER,
      registration_number: DataTypes.STRING,
      score: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      status: DataTypes.STRING(20),
    },
    {
      sequelize,
      modelName: 'Contestant',
      tableName: 'contestants',
      timestamps: true,
      underscored: true,
    }
  );

  return Contestant;
};

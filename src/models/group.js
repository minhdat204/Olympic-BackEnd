'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.belongsTo(models.Match, { foreignKey: 'match_id' });
      Group.belongsTo(models.User, { foreignKey: 'judge_id' });
      Group.hasMany(models.Contestant, { foreignKey: 'group_id' });
    }
  }

  Group.init(
    {
      group_name: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: 'Group',
      tableName: 'groups',
      timestamps: true,
      underscored: true,
    }
  );

  return Group;
};

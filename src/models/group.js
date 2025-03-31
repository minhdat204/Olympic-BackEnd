'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.belongsTo(models.Match, {
        foreignKey: 'match_id',
        as: 'match'
      });
      Group.belongsTo(models.User, {
        foreignKey: 'judge_id',
        as: 'judge'
      });
      Group.hasMany(models.Contestant, {
        foreignKey: 'group_id',
        as: 'contestants'
      });
    }
  }
  Group.init({
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    group_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    match_id: DataTypes.SMALLINT,
    judge_id: DataTypes.SMALLINT,
    chot: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Group',
    tableName: 'groups',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
  });
  return Group;
};
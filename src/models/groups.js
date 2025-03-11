'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  groups.init({
    id: DataTypes.BIGINT,
    group_name: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    match_id: DataTypes.BIGINT,
    judge_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'groups',
  });
  return groups;
};
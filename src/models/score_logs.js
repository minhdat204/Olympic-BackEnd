'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class score_logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  score_logs.init({
    id: DataTypes.BIGINT,
    score: DataTypes.DECIMAL,
    rescued: DataTypes.BOOLEAN,
    contestant_id: DataTypes.BIGINT,
    match_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'score_logs',
  });
  return score_logs;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  answers.init({
    id: DataTypes.BIGINT,
    is_correct: DataTypes.TINYINT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    contestant_id: DataTypes.BIGINT,
    question_id: DataTypes.BIGINT,
    match_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'answers',
  });
  return answers;
};
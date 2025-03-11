'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class matches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  matches.init({
    id: DataTypes.BIGINT,
    match_name: DataTypes.STRING,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    status: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    current_question_id: DataTypes.BIGINT,
    current_question_status: DataTypes.STRING,
    completed_questions: DataTypes.BIGINT,
    rescue_1: DataTypes.INTEGER,
    rescue_2: DataTypes.INTEGER,
    rescue_3: DataTypes.TINYINT,
    rescued_count_1: DataTypes.INTEGER,
    rescued_count_2: DataTypes.INTEGER,
    round_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'matches',
  });
  return matches;
};
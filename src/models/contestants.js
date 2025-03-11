'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contestants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  contestants.init({
    id: DataTypes.BIGINT,
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    shool: DataTypes.STRING,
    class_year: DataTypes.INTEGER,
    registration_number: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    qualifying_score: DataTypes.INTEGER,
    current_question: DataTypes.INTEGER,
    group_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'contestants',
  });
  return contestants;
};
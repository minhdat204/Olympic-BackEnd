'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class video_submissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  video_submissions.init({
    id: DataTypes.BIGINT,
    name: DataTypes.STRING,
    video_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'video_submissions',
  });
  return video_submissions;
};
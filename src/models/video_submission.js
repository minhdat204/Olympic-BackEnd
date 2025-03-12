'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VideoSubmission extends Model {
    static associate(models) {
      // No associations defined in foreign key constraints
    }
  }
  VideoSubmission.init({
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    video_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM("Team", "Sponsor"),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'VideoSubmission',
    tableName: 'video_submissions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
  });
  return VideoSubmission;
};
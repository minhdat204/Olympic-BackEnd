'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VideoSubmission extends Model {
    static associate(models) {
      VideoSubmission.belongsTo(models.Round, { foreignKey: 'round_id' });
    }
  }

  VideoSubmission.init(
    {
      team_name: DataTypes.STRING,
      video_url: DataTypes.STRING,
      submitted_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'VideoSubmission',
      tableName: 'video_submissions',
      timestamps: false,
      underscored: true,
    }
  );

  return VideoSubmission;
};

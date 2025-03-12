'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QuestionPackage extends Model {
    static associate(models) {
      QuestionPackage.hasMany(models.QuestionPackageDetail, { foreignKey: 'package_id' });
      QuestionPackage.hasMany(models.Match, { foreignKey: 'package_id' });
    }
  }

  QuestionPackage.init(
    {
      package_name: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: 'QuestionPackage',
      tableName: 'question_packages',
      timestamps: true,
      underscored: true,
    }
  );

  return QuestionPackage;
};

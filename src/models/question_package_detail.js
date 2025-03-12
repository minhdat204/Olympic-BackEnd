'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QuestionPackageDetail extends Model {
    static associate(models) {
      QuestionPackageDetail.belongsTo(models.QuestionPackage, { foreignKey: 'package_id' });
      QuestionPackageDetail.belongsTo(models.Question, { foreignKey: 'question_id' });
    }
  }

  QuestionPackageDetail.init(
    {
      question_order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'QuestionPackageDetail',
      tableName: 'question_package_details',
      timestamps: true,
      underscored: true,
    }
  );

  return QuestionPackageDetail;
};

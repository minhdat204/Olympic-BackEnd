'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    static associate(models) {
      Answer.belongsTo(models.Contestant, { foreignKey: 'contestant_id' });
      Answer.belongsTo(models.Question, { foreignKey: 'question_id' });
    }
  }

  Answer.init(
    {
      is_correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Answer',
      tableName: 'answers',
      timestamps: true,
      underscored: true,
    }
  );

  return Answer;
};

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    static associate(models) {
      Match.belongsTo(models.Round, { foreignKey: 'round_id' });
      Match.belongsTo(models.QuestionPackage, { foreignKey: 'package_id' });
      Match.belongsTo(models.QuestionPackageDetail, { foreignKey: 'current_question_id' });
      Match.belongsTo(models.Contestant, { foreignKey: 'gold_winner_id', as: 'goldWinner' });

      Match.hasMany(models.Group, { foreignKey: 'match_id' });
      Match.hasMany(models.ScoreLog, { foreignKey: 'match_id' });
      Match.hasMany(models.Contestant, { foreignKey: 'current_round_id' });
    }
  }

  Match.init(
    {
      match_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      current_question_id: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
      gold_winner_id: {
        type: DataTypes.BIGINT(20),
        allowNull: true,
      },
      current_question_status: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      completed_questions: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
      round_id: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
      package_id: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Match',
      tableName: 'matches',
      timestamps: true,
      underscored: true,
    }
  );

  return Match;
};

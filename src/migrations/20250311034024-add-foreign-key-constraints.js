'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    // Answers table
    await queryInterface.addConstraint('answers', {
      fields: ['question_id'],
      type: 'foreign key',
      name: 'fk_answers_question_id',
      references: {
        table: 'questions',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('answers', {
      fields: ['contestant_id'],
      type: 'foreign key',
      name: 'fk_answers_contestant_id',
      references: {
        table: 'contestants',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('answers', {
      fields: ['match_id'],
      type: 'foreign key',
      name: 'fk_answers_match_id',
      references: {
        table: 'matches',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Contestants table
    await queryInterface.addConstraint('contestants', {
      fields: ['group_id'],
      type: 'foreign key',
      name: 'fk_contestants_group_id',
      references: {
        table: 'groups',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Groups table
    await queryInterface.addConstraint('groups', {
      fields: ['match_id'],
      type: 'foreign key',
      name: 'fk_groups_match_id',
      references: {
        table: 'matches',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    
    await queryInterface.addConstraint('groups', {
      fields: ['judge_id'],
      type: 'foreign key',
      name: 'fk_groups_judge_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Matches table
    await queryInterface.addConstraint('matches', {
      fields: ['current_question_id'],
      type: 'foreign key',
      name: 'fk_matches_current_question_id',
      references: {
        table: 'questions',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('matches', {
      fields: ['gold_winner_id'],
      type: 'foreign key',
      name: 'fk_matches_gold_winner_id',
      references: {
        table: 'contestants',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // score_logs table
    await queryInterface.addConstraint('score_logs', {
      fields: ['contestant_id'],
      type: 'foreign key',
      name: 'fk_score_logs_contestant_id',
      references: {
        table: 'contestants',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('score_logs', {
      fields: ['match_id'],
      type: 'foreign key',
      name: 'fk_score_logs_match_id',
      references: {
        table: 'matches',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });


    // questions table
    await queryInterface.addConstraint('questions', {
      fields: ['match_id'],
      type: 'foreign key',
      name: 'fk_questions_match_id',
      references: {
        table: 'matches',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

     // Thêm ràng buộc UNIQUE cho Users table
     await queryInterface.addConstraint('users', {
      fields: ['username'],
      type: 'unique',
      name: 'users_username_unique'
    });

    await queryInterface.addConstraint('users', {
      fields: ['email'],
      type: 'unique',
      name: 'users_email_unique'
    });

  },

  async down (queryInterface, Sequelize) {
    try {
      // Tạm thời tắt kiểm tra khóa ngoại
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  
       // Xóa ràng buộc UNIQUE users
       await queryInterface.removeConstraint('users', 'users_username_unique');
       await queryInterface.removeConstraint('users', 'users_email_unique');

      // Xóa các ràng buộc khóa ngoại
      await queryInterface.removeConstraint('answers', 'fk_answers_question_id');
      await queryInterface.removeConstraint('answers', 'fk_answers_contestant_id');
      await queryInterface.removeConstraint('answers', 'fk_answers_match_id');
      await queryInterface.removeConstraint('contestants', 'fk_contestants_group_id');
      await queryInterface.removeConstraint('groups', 'fk_groups_match_id');
      await queryInterface.removeConstraint('groups', 'fk_groups_judge_id');
      await queryInterface.removeConstraint('matches', 'fk_matches_round_id');
      await queryInterface.removeConstraint('matches', 'fk_matches_current_question_id');
      await queryInterface.removeConstraint('score_logs', 'fk_score_logs_contestant_id');
      await queryInterface.removeConstraint('score_logs', 'fk_score_logs_match_id');
      await queryInterface.removeConstraint('questions', 'fk_questions_match_id');
    } catch (error) {
      console.log('Lỗi khi xóa ràng buộc:', error.message);
    } finally {
      // Bật lại kiểm tra khóa ngoại
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    }
  }
};

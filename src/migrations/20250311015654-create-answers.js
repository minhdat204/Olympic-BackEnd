"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("answers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT,
      },
      is_correct: {
        type: Sequelize.BOOLEAN,
      },
      contestant_id: {
        type: Sequelize.SMALLINT,
      },
      question_id: {
        type: Sequelize.SMALLINT,
      },
      match_id: {
        type: Sequelize.SMALLINT,
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    try {
      // Tắt kiểm tra khóa ngoại
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      
      // Xóa bảng
      await queryInterface.dropTable("answers");
    } finally {
      // Bật lại kiểm tra khóa ngoại
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    }
  },
};

"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("groups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT,
      },
      group_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      match_id: {
        type: Sequelize.SMALLINT,
      },
      judge_id: {
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
      await queryInterface.dropTable("groups");
    } finally {
      // Bật lại kiểm tra khóa ngoại
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    }
  },
};

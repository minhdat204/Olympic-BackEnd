"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("match_contestants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      registration_number: {
        type: Sequelize.TINYINT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(
          "Chưa thi",
          "Đang thi",
          "Xác nhận 1",
          "Xác nhận 2",
          "Bị loại",
          "Được cứu",
          "Cấm thi",
          "Qua vòng"
        ),
        defaultValue: "Đang thi",
      },
      eliminated_at_question_order: {
        type: Sequelize.TINYINT,
        defaultValue: null,
      },
      match_id: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      contestant_id: {
        type: Sequelize.SMALLINT,
        allowNull: false,
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
      await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

      // Xóa bảng
      await queryInterface.dropTable("match_contestants");
    } finally {
      // Bật lại kiểm tra khóa ngoại
      await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    }
  },
};

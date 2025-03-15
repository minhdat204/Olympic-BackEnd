"use strict";

const { Model } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("contestants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT,
      },
      fullname: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      class: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      class_year: {
        type: Sequelize.TINYINT,
        allowNull: false,
      },
      registration_number: {
        type: Sequelize.SMALLINT,
      },
      qualifying_score: {
        type: Sequelize.TINYINT,
      },
      current_question: {
        type: Sequelize.TINYINT,
        defaultValue: -1,
      },
      group_id: {
        type: Sequelize.SMALLINT,
      },
      round_name: {
        type: Sequelize.ENUM("Vòng loại", "Tứ Kết", "Bán Kết", "Chung Kết"),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("Chưa thi", "Đang thi", "Xác nhận 1", "Chờ cứu", "Bị loại"),
        defaultValue: "Chưa thi",
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
      await queryInterface.dropTable("contestants");
    } finally {
      // Bật lại kiểm tra khóa ngoại
      await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    }
  },
};

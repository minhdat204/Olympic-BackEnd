"use strict";

const { toDefaultValue } = require("sequelize/lib/utils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("matches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT,
      },
      match_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      start_time: {
        type: Sequelize.DATE,
      },
      end_time: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM("Chưa diễn ra", "Đang diễn ra", "Đã kết thúc"),
        defaultValue: "Chưa diễn ra",
      },
      current_question_id: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        defaultValue: null,
      },
      rescue_1: {
        type: Sequelize.TINYINT,
        DefaultValue: -1,
      },
      rescue_2: {
        type: Sequelize.TINYINT,
        DefaultValue: -1,
      },
      plane: {
        type: Sequelize.TINYINT,
        DefaultValue: -1,
      },
      rescued_count_1: {
        type: Sequelize.TINYINT,
        DefaultValue: -1,
      },
      rescued_count_2: {
        type: Sequelize.TINYINT,
        DefaultValue: -1,
      },
      round_name: {
        type: Sequelize.ENUM("Vòng loại", "Tứ Kết", "Bán Kết", "Chung Kết"),
        allowNull: false,
      },
      gold_winner_id: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        defaultValue: null,
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
      await queryInterface.dropTable("matches");
    } finally {
      // Bật lại kiểm tra khóa ngoại
      await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    }
  },
};

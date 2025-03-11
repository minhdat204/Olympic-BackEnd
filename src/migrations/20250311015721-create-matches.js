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
        type: Sequelize.INTEGER,
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
        type: Sequelize.ENUM("UpComing", "Ongoing", "Finished"),
      },
      current_question_id: {
        type: Sequelize.INTEGER,
      },
      rescue_1: {
        type: Sequelize.TINYINT,
        DefaultValue: -1,
      },
      rescue_2: {
        type: Sequelize.TINYINT,
        DefaultValue: -1,
      },
      Plane: {
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
      gold_winner_id: Sequelize.INTEGER,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("matches");
  },
};

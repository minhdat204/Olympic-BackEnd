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
        type: Sequelize.INTEGER,
      },
      fullname: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      shool: {
        type: Sequelize.STRING(100),
      },
      class_year: {
        type: Sequelize.TINYINT,
        allowNull: false,
      },
      registration_number: {
        type: Sequelize.INTEGER,
      },
      qualifying_score: {
        type: Sequelize.TINYINT,
      },
      current_question: {
        type: Sequelize.TINYINT,
      },
      group_id: {
        type: Sequelize.INTEGER,
      },
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
    await queryInterface.dropTable("contestants");
  },
};

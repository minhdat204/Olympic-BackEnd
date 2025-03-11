"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      question_text: {
        type: Sequelize.TEXT,
      },
      question_intro: {
        type: Sequelize.TEXT,
      },
      question_topic: {
        type: Sequelize.TEXT,
      },
      question_explanation: {
        type: Sequelize.TEXT,
      },
      question_type: {
        type: Sequelize.ENUM(
          "Trắc Nghiệm",
          "Hình Ảnh",
          "Âm Thanh",
          "Video",
          "Tự Luận"
        ),
        allowNull: false,
      },
      media_url: {
        type: Sequelize.STRING,
      },
      correct_anwer: {
        type: Sequelize.TEXT,
      },
      options: {
        type: Sequelize.JSON,
      },
      question_order: {
        type: Sequelize.TINYINT,
      },
      timer: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      time_left: {
        type: Sequelize.INTEGER,
      },
      dificulty: {
        type: Sequelize.ENUM("Alpha", "Beta", "RC", "Gold"),
        allowNull: false,
      },
      match_id: {
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
    await queryInterface.dropTable("questions");
  },
};

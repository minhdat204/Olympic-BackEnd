"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT,
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
          "Hình Ảnh",
          "Âm Thanh",
          "Video",
          "Tự Luận"
        ),
        allowNull: false,
      },
      media_url: {
        type: Sequelize.JSON,
      },
      correct_answer: {
        type: Sequelize.TEXT,
      },
      correct_answer_type: {
        type: Sequelize.ENUM("Text", "Image", "Audio", "Video", "Multiple Choice"),
        allowNull: false,
        defaultValue: "Text",
      },
      options: {
        type: Sequelize.JSON,
      },
      question_order: {
        type: Sequelize.TINYINT,
      },
      timer: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      time_left: {
        type: Sequelize.SMALLINT,
      },
      dificulty: {
        type: Sequelize.ENUM("Alpha", "Beta", "RC", "Gold"),
        allowNull: false,
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
      await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

      // Xóa bảng
      await queryInterface.dropTable("questions");
    } finally {
      // Bật lại kiểm tra khóa ngoại
      await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    }
  },
};

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("questions", "correct_answer_type", {
      type: Sequelize.ENUM("Text", "Image", "Audio", "Video"),
      allowNull: false,
      defaultValue: "Text",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("questions", "correct_answer_type");
    // Xóa ENUM nếu cần (tùy thuộc vào cơ sở dữ liệu, ví dụ PostgreSQL)
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS \"enum_questions_correct_answer_type\";"
    );
  },
};
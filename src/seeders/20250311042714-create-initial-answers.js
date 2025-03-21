"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const answers = Array.from({ length: 100 }, () => ({
      is_correct: Math.random() < 0.5,
      question_id: Math.floor(Math.random() * 13) + 1, // Giả sử có 13 câu hỏi
      contestant_id: Math.floor(Math.random() * 60) + 1,
      match_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("answers", answers);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("answers", null, {});
  },
};

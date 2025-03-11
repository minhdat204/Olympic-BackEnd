"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let results = [];

    for (let i = 0; i < 100; i++) {
      results.push({
        is_correct: Math.random() < 0.5,
        question_id: Math.floor(Math.random() * 8) + 1,
        contestant_id: Math.floor(Math.random() * 60) + 1,
        match_id: 1,
      });
    }

    await queryInterface.bulkInsert("answers", results);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("answers", null, {});
  },
};

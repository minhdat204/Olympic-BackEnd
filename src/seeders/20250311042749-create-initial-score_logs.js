"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let scores = [];

    for (let i = 0; i < 100; i++) {
      scores.push({
        score: 1,
        rescued: Math.random() < 0.5,
        contestant_id: Math.floor(Math.random() * 59) + 1,
        match_id: 1,
      });
    }

    await queryInterface.bulkInsert("score_logs", scores);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("score_logs", null, {});
  },
};

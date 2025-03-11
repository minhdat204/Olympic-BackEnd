"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let video = [];
    const type = ["Team", "Sponsor"];
    for (let i = 0; i < 20; i++) {
      video.push({
        name: `Video ${i}`,
        video_url: `url${i}`,
        type: type[Math.floor(Math.random() * type.length)],
      });
    }
    await queryInterface.bulkInsert("video_submissions", video);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("video_submissions", null, {});
  },
};

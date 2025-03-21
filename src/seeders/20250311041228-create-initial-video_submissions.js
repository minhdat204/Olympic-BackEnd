"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let videos = [];
    const types = ["Team", "Sponsor"];

    for (let i = 1; i <= 20; i++) {
      videos.push({
        name: `Video ${i}`,
        video_url: `https://example.com/video${i}.mp4`, // Giả lập URL hợp lệ
        type: types[Math.floor(Math.random() * types.length)], // Chọn ngẫu nhiên
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return await queryInterface.bulkInsert("video_submissions", videos);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("video_submissions", null, {});
  },
};

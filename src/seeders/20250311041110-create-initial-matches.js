"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("matches", [
      {
        match_name: "Trận đấu bán kết khóa 23",
        start_time: new Date(),
        status: "Chưa diễn ra",
        rescue_1: 3,
        rescue_2: 6,
        Plane: true,
        rescued_count_1: 8,
        rescued_count_2: 6,
        round_name: "Bán Kết",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("matches", null, {});
  },
};

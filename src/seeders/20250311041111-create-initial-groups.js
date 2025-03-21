"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let groups = [];

    for (let i = 1; i <= 6; i++) {
      groups.push({
        group_name: `Nhóm ${i}`,
        match_id: 1,
        judge_id: i + 1, // Bắt đầu từ 2 đến 7
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return await queryInterface.bulkInsert("groups", groups);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("groups", null, {});
  },
};

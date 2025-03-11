"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let groups = [];
    for (let i = 2; i < 8; i++) {
      groups.push({
        group_name: `Nhóm ${i - 1}`,
        match_id: 1,
        judge_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("groups", groups);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("groups", null, {});
  },
};

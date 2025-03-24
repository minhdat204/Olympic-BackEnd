"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let contestants = [];

    const classList = ["10A1", "10A2", "10A3", "10A4"];
    const classYearList = [22, 23, 24];

    let index = 0;
    for (let classIndex = 0; classIndex < classList.length; classIndex++) {
      for (let i = 0; i < 15; i++) {
        contestants.push({
          fullname: `Thí sinh ${index + 1}`,
          email: `thisinh${index + 1}@gmail.com`,
          class: classList[classIndex], // Mỗi lớp có 15 thí sinh
          class_year: 22, // Chia theo năm học
          qualifying_score: Math.floor(Math.random() * 100) + 1, // Random từ 1 - 100
          group_id: Math.floor(index / 10) + 1, // Giữ nguyên cách chia nhóm cũ (1 - 6)
          created_at: new Date(),
          updated_at: new Date(),
        });
        index++;
      }
    }

    return await queryInterface.bulkInsert("contestants", contestants);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("contestants", null, {});
  },
};

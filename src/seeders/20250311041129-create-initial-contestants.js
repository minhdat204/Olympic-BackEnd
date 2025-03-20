"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let contestants = [];

    const classList = ["10A1", "10A2", "10A3", "10A4", "10A5", "10A6"];
    const classYearList = [22, 23, 24];

    for (let i = 0; i < 60; i++) {
      contestants.push({
        fullname: `Thí sinh ${i}`,
        email: `thisinh${i}@gmail.com`,
        class: classList[Math.floor(Math.random() * classList.length)], // Chọn ngẫu nhiên từ classList
        class_year:
          classYearList[Math.floor(Math.random() * classYearList.length)], // Chọn ngẫu nhiên từ classYearList
        qualifying_score: Math.floor(Math.random() * 100) + 1, // Random từ 1 - 100
        group_id: Math.floor(i / 10) + 1, // Giữ nguyên cách chia nhóm cũ (1 - 6)
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return await queryInterface.bulkInsert("contestants", contestants);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("contestants", null, {});
  },
};

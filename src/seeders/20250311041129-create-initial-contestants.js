"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let contestants = [];
    const statusList = ["Chưa thi", "Đang thi", "Xác nhận 1", "Chờ cứu", "Bị loại"];
    const roundNameList = ["Vòng loại", "Tứ Kết", "Bán Kết", "Chung Kết"];
    const classList = ["10A1", "10A2", "10A3", "10A4", "10A5", "10A6"];
    const classYearList = [22, 23, 24];

    for (let i = 0; i < 60; i++) {
      contestants.push({
        fullname: `Thí sinh ${i + 1}`,
        email: `thisinh${i}@gmail.com`,
        class: classList[Math.floor(Math.random() * classList.length)], // Chọn ngẫu nhiên từ classList 
        class_year:
          classYearList[Math.floor(Math.random() * classYearList.length)], // Chọn ngẫu nhiên từ classYearList
        registration_number: i,
        qualifying_score: Math.floor(Math.random() * 100) + 1, // Random từ 1 - 100
        current_question: -1,
        round_name: roundNameList[Math.floor(Math.random() * roundNameList.length)], // Chọn random round name
        status: statusList[Math.floor(Math.random() * statusList.length)], // Chọn random status
        group_id: Math.floor(i / 10) + 1,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("contestants", contestants);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("contestants", null, {});
  },
};

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let contestants = [];
    let matchId = 1; // Thay đổi match_id nếu cần
    let statuses = [
      "Chưa thi",
      "Đang thi",
      "Xác nhận 1",
      "Xác nhận 2",
      "Bị loại",
      "Cấm thi",
      "Qua vòng",
    ];

    for (let i = 1; i <= 60; i++) {
      let randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      let eliminatedAt =
        randomStatus === "Xác nhận 2"
          ? Math.floor(Math.random() * 13) + 1 // Random từ 1 đến 13
          : null;

      contestants.push({
        registration_number: i,
        status: randomStatus,
        eliminated_at_question_order: eliminatedAt,
        match_id: matchId,
        contestant_id: i, // Dùng tuần tự từ 1 đến 60
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("match_contestants", contestants, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("match_contestants", null, {});
  },
};

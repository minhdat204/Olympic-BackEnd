"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "admin",
          password: "tinhoc2025",
          email: "admin@gmail.com",
          role: "admin",
        },
      ],
      {}
    );
    let users = [];
    for (let i = 0; i < 7; i++) {
      users.push({
        username: `Trọng Tài ${i + 1}`,
        password: `tinhoc2025`,
        email: `trongtai${i}@gmail.com`,
        role: `judge`,
      });
    }
    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

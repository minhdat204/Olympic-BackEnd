"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Tạo tài khoản admin
    await queryInterface.bulkInsert("users", [
      {
        username: "admin",
        password: await bcrypt.hash("tinhoc2025", 10),
        email: "admin@gmail.com",
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // Tạo 7 tài khoản trọng tài
    let users = [];
    for (let i = 1; i <= 3; i++) {
      users.push({
        username: `trongtai${i}`,
        password: await bcrypt.hash("tinhoc2025", 10),
        email: `trongtai${i}@gmail.com`,
        role: "judge",
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return await queryInterface.bulkInsert("users", users);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("users", null, {});
  },
};

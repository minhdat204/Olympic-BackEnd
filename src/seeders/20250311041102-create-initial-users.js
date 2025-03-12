"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users", // Note: table name should be lowercase to match your naming convention
      [
        {
          username: "admin",
          password: await bcrypt.hash("tinhoc2025", 10), // Added await here
          email: "admin@gmail.com",
          role: "admin",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
    
    let users = [];
    for (let i = 0; i < 7; i++) {
      users.push({
        username: `Trọng Tài ${i + 1}`,
        password: await bcrypt.hash("tinhoc2025", 10), // Added await here
        email: `trongtai${i}@gmail.com`,
        role: `judge`,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("users", users); // lowercase table name
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {}); // lowercase table name
  },
};
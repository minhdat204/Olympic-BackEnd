'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('tinhoc@123$%^', 10),
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'judge1',
        email: 'judge1@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'judge',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};

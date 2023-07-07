'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bukInsert('userroles',[
      { 
        id:1,
        name:'Super Admin',
      },
      { 
        id:2,
        name:'Admin',
      },
      {
        id:3,
        name:'Storekeeper',
      },
      {
        id:4,
        name:'Sales Staff',
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('userroles', null);
  }
};

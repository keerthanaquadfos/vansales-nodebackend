'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bukInsert('useraccounts',[
      { 
        id:1,
        name:'Super Admin',
        email:'superadmin@gmail.com',
        password:'Qwerty123',
        roleId:1,
        companyId:0,
        designationId:0,
        departmentId:0,
        active:true
      } 
    ])
  },

  async down (queryInterface, Sequelize) {    
    await queryInterface.bulkDelete('useraccounts', null, {});
  }
};

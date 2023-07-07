module.exports = (sequelize, Sequelize) => {
  const UserAccount = sequelize.define("useraccount", {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    roleId: {
      type: Sequelize.INTEGER
    },
    companyId: {
      type: Sequelize.INTEGER
    },
    designationId: {
      type: Sequelize.INTEGER
    },
    departmentId: {
      type: Sequelize.INTEGER
    },
    active: {
      type: Sequelize.BOOLEAN
    }
  }); 
  return UserAccount;
};
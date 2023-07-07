module.exports = (sequelize, Sequelize) => {
    const UserRole = sequelize.define("userrole", {
      name: {
        type: Sequelize.STRING
      }, 
    }); 
    return UserRole;
  };
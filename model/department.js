module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("department", { 
      name: {
        type: Sequelize.STRING
      },
      companyId: {
        type: Sequelize.INTEGER
      } 
    }); 
    return Category;
  };
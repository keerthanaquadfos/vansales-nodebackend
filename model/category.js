module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
      code: {
        type: Sequelize.STRING
        },
        companyId: {
          type: Sequelize.INTEGER
          },
      name: {
        type: Sequelize.STRING
      }  
    }); 
    return Category;
  };
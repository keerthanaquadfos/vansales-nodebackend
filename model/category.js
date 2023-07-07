module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
      code: {
        type: Sequelize.STRING
        }, 
      name: {
        type: Sequelize.STRING
      }  
    }); 
    return Category;
  };
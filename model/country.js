module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("country", {
      code: {
        type: Sequelize.STRING
        }, 
      name: {
        type: Sequelize.STRING
      }  
    }); 
    return Category;
  };
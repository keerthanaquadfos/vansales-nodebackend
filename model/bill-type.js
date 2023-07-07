module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("billtype", { 
      name: {
        type: Sequelize.STRING
      }  
    }); 
    return Category;
  };
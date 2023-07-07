module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("designation", { 
      name: {
        type: Sequelize.STRING
      }  ,
      companyId: {
        type: Sequelize.INTEGER
      } 
    }); 
    return Category;
  };
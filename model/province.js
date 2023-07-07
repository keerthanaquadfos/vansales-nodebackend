module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("province", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
      countryId: {
        type: Sequelize.INTEGER
        }, 
      code: {
        type: Sequelize.STRING
        }, 
      name: {
        type: Sequelize.STRING
      }  
    }); 
    return Category;
  };
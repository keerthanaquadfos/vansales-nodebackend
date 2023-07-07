const province = require("./province");

module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("company", { 
      name: {
        type: Sequelize.STRING
      } ,
      address: {
        type: Sequelize.STRING
      } ,
      contact: {
        type: Sequelize.STRING
      } ,
      email: {
        type: Sequelize.STRING
      } ,
      maxUsers: {
        type: Sequelize.INTEGER
      } , 
    }); 
    return Category;
  };
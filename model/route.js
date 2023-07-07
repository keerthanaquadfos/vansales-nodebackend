module.exports = (sequelize, Sequelize) => {
    const Route = sequelize.define("route", {
      companyId: {
        type: Sequelize.INTEGER
        }, 
      code: {
        type: Sequelize.STRING
        }, 
      name: {
        type: Sequelize.STRING
      } ,
      description: {
        type: Sequelize.STRING
      }  
    }); 
    return Route;
  };
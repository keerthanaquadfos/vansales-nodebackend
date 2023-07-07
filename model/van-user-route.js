module.exports = (sequelize, Sequelize) => {
    const VanUserRoute = sequelize.define("vanuserroute", { 
      vanId: {
        type: Sequelize.INTEGER
      },
      routeId:{
        type: Sequelize.INTEGER
      },
      shopId:{
        type: Sequelize.INTEGER
      },
      userId:{
        type: Sequelize.INTEGER
      },companyId:{
        type: Sequelize.INTEGER
      }
    });   

    return VanUserRoute;
  };
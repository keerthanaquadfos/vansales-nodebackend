module.exports = (sequelize, Sequelize) => {
    const VanStockRequest = sequelize.define("vanStockRequest", { 
      requestNo:{
        type: Sequelize.INTEGER
      },
      companyId: {
        type: Sequelize.INTEGER
      }, 
      vanId: {
        type: Sequelize.INTEGER
      },  
      userId: {
        type: Sequelize.INTEGER
      },
      allotted:{
        type: Sequelize.INTEGER  //1=PENDING , 2 = PARTIALLY , 3 = ALLOTTED
      }
    }); 
    return VanStockRequest;
  };
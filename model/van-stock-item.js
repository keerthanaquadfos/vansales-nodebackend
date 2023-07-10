
  module.exports = (sequelize, Sequelize) => {
    const VanStockItem = sequelize.define("vanStockItem", { 
      vanStockRequestId: {
        type: Sequelize.INTEGER
      }, 
      productId: {
        type: Sequelize.INTEGER 
      },
      productName: {
        type: Sequelize.STRING
      },
      requestedQty: {
        type: Sequelize.DECIMAL(5,2),
        defaultValue: 0.000, 
      },
      qty: {
        type: Sequelize.DECIMAL(5,2),
        defaultValue: 0.000, 
      },   
      allotted:{
        defaultValue: false, 
        type:Sequelize.BOOLEAN
      },
      sold:{
        defaultValue: false, 
        type:Sequelize.BOOLEAN
      } 
    }); 
    return VanStockItem;
  };
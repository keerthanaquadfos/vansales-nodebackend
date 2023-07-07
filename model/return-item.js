module.exports = (sequelize, Sequelize) => {
    const ReturnItem = sequelize.define("returnItem", {
      purchaseReturnId: {
        type: Sequelize.INTEGER
        }, 
      productId: {
        type: Sequelize.INTEGER
      },
      qty:{
        type: Sequelize.DECIMAL(6,2)
      },
      price:{
        type: Sequelize.DECIMAL(9,2)
      }
    }); 
    return ReturnItem;
  };
module.exports = (sequelize, Sequelize) => {
    const PurchaseReturn = sequelize.define("purchasereturn", {
      companyId: {
        type: Sequelize.INTEGER
        }, 
      orderId: {
        type: Sequelize.INTEGER
        }, 
        shopId: {
          type: Sequelize.INTEGER
          }, 
      returnDate: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER  // 1 pending, 2 accepted, 3 rejected
      },
      remarks:{
        type: Sequelize.STRING
      }
    }); 
    return PurchaseReturn;
  };
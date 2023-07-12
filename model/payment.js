module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", { 
      orderId: {
        type: Sequelize.INTEGER
      }, 
      voucherNo: {
        type: Sequelize.INTEGER
      }, 
      voucherDate: {
        type: Sequelize.DATE
      } ,
      companyId: {
        type: Sequelize.INTEGER
      },
      payed:{
        type: Sequelize.DECIMAL(9,2),
        
      },
      balance:{
        type: Sequelize.DECIMAL(9,2),
        
      }
    }); 
    return Payment;
  };
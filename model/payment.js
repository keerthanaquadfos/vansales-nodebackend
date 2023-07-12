module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", { 
      orderId: {
        type: Sequelize.STRING
      }, 
      companyId: {
        type: Sequelize.INTEGER
      },
      payed:{
        type: Sequelize.DECIMAL(9,2),
        get() {
          return parseFloat(this.getDataValue('amount')) || 0.0;
        }
      },
      balance:{
        type: Sequelize.DECIMAL(9,2),
        get() {
          return parseFloat(this.getDataValue('amount')) || 0.0;
        }
      }
    }); 
    return Payment;
  };
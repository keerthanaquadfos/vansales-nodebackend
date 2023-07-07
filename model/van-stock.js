module.exports = (sequelize, Sequelize) => {
    const VanStock = sequelize.define("vanStock", { 
      companyId: {
        type: Sequelize.INTEGER
        }, 
      vanId: {
        type: Sequelize.INTEGER
      }, 
      productId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
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
    return VanStock;
  };
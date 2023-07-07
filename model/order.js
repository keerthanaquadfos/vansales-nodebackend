module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      orderNo: {
        type: Sequelize.INTEGER
        }, 
        deliveryDate: {
          type: Sequelize.DATE
        } ,
      orderDate: {
        type: Sequelize.DATE
      } ,
      companyId: {
        type: Sequelize.INTEGER
      } ,
      shopId: {
        type: Sequelize.INTEGER
      } ,
      tax: {
        type: Sequelize.DECIMAL(9,2),
        get() {
          return parseFloat(this.getDataValue('tax')) || 0.0;
        }
      } ,
      amount: {
        type: Sequelize.DECIMAL(9,2),
        get() {
          return parseFloat(this.getDataValue('amount')) || 0.0;
        }
      } ,
      orderdBy:{
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER   // 1 REQUESTED, 2 RELEASED, 3 CONFIRMED, 4 CANCELD,  5 DELIVERD,
      }
    },{
      indexes:[
       {
         unique: false,
         fields:['status']
       },
       {
        unique: false,
        fields:['companyId']
      },
      ]
    }); 
    return Order;
  };
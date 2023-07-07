module.exports = (sequelize, Sequelize) => {
    const OrderDetail = sequelize.define("orderDetail", {
      orderId: {
        type: Sequelize.INTEGER
        },  
      productId: {
        type: Sequelize.INTEGER
      } ,
      orderdQty: {
        type: Sequelize.DECIMAL(6,2),
        get() {
          return parseFloat(this.getDataValue('orderdQty')) || 0.0;
        }
      } ,
      deliverableQty: {
        type: Sequelize.DECIMAL(6,2),
        get() {
          return parseFloat(this.getDataValue('deliverableQty')) || 0.0;
        }
      } ,
      amount: {
        type: Sequelize.DECIMAL(9,2),
        get() {
          return parseFloat(this.getDataValue('amount')) || 0.0;
        }
      }       
    }); 
    return OrderDetail;
  };
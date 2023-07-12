module.exports = (sequelize, Sequelize) => {
    const Complaint = sequelize.define("complaint", {
      code:{
        type: Sequelize.INTEGER
      },
      complaintTypeId: {  
        type: Sequelize.INTEGER
      }, 
      shopId: {
        type: Sequelize.INTEGER
      },  
      companyId: {
        type: Sequelize.INTEGER
      },  
      productId: {
        type: Sequelize.INTEGER
      },  
      remarks: {
        type: Sequelize.STRING,
        allowNull: true
      },   
      status: {
        type: Sequelize.INTEGER  // 1 open,2 rescheduled, 3 closed
      }, 
      scheduledAt: {
        type: Sequelize.DATE
      }, 
      productSerial: {
        type: Sequelize.STRING,
        allowNull: true
      }, 
      finalRemarks: {
        type: Sequelize.STRING,
        allowNull: true
      },  
    }); 
    return Complaint;
  };
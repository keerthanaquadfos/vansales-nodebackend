module.exports = (sequelize, Sequelize) => {
    const Complaint = sequelize.define("complaint", {
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
        type: Sequelize.STRING
      },   
      status: {
        type: Sequelize.INTEGER  // 1 open,2 rescheduled, 3 closed
      }, 
      scheduledAt: {
        type: Sequelize.DATE
      }, 
    }); 
    return Complaint;
  };
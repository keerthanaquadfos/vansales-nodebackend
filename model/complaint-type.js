module.exports = (sequelize, Sequelize) => {
    const ComplaintType = sequelize.define("complaintType", { 
      name: {
        type: Sequelize.STRING
      }  
    }); 
    return ComplaintType;
  };
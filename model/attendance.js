module.exports = (sequelize, Sequelize) => {
    const Attendance = sequelize.define("attendance", {
      employeeId:{
        type: Sequelize.INTEGER
      },
      checkIn: {
        type: Sequelize.STRING,
        
      }, 
      checkInTime: {
        type: Sequelize.STRING,
        
      }, 
      odmeter: {
        type: Sequelize.STRING,
        allowNull: true,
      }  ,
      odmeterEnd: {
        type: Sequelize.STRING,
        allowNull: true,
      }  ,
      checkinLat: {
        type: Sequelize.STRING
      }  ,
      checkinLong: {
        type: Sequelize.STRING
      },
      checkOut: {
        type: Sequelize.STRING,
        allowNull: true,
      }, 
      checkOutTime: {
        type: Sequelize.STRING,
        
      }, 
      checkOutLat: {
        type: Sequelize.STRING,
        allowNull: true,
      }  ,
      checkOutLong: {
        type: Sequelize.STRING,
        allowNull: true,
      }  
    }); 
    return Attendance;
  };
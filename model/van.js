module.exports = (sequelize, Sequelize) => {
    const Van = sequelize.define("van", {
      code: {
        type: Sequelize.STRING
      }, 
      companyId: {
        type: Sequelize.STRING
      },     
      name: {
        type: Sequelize.STRING
      }   
    }); 
    return Van;
  };
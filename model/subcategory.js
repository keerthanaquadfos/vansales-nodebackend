module.exports = (sequelize, Sequelize) => {
    const SubCategory = sequelize.define("subcategory", {
      code: {
        type: Sequelize.STRING
        }, 
        companyId: {
          type: Sequelize.INTEGER
          },
        categoryId: {
          type: Sequelize.INTEGER
          }, 
      name: {
        type: Sequelize.STRING
      }  
    }); 
    return SubCategory;
  };
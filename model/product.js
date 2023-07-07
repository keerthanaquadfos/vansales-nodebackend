module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      companyId: {
        type: Sequelize.INTEGER
        },
      categoryId: {
        type: Sequelize.INTEGER
        },
        subCategoryId: {
        type: Sequelize.INTEGER
        },
      code: {
        type: Sequelize.STRING
        }, 
      name: {
        type: Sequelize.STRING
      }, 
      description: {
        type: Sequelize.STRING
      },
      price : {
        type: Sequelize.DECIMAL(9,2)
      },
      taxPercentage : {
        type: Sequelize.DECIMAL(9,2)
      }
    },{
      indexes:[       
       {
        unique: false,
        fields:['companyId']
      },
      ]
    }); 
    return Product;
  };
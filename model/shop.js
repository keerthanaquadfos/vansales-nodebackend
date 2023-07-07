module.exports = (sequelize, Sequelize) => {
    const Shop = sequelize.define("shop", {
      code: {
        type: Sequelize.STRING
        }, 
      name: {
        type: Sequelize.STRING
      } ,
      trn: {
        type: Sequelize.STRING
      } ,
      address: {
        type: Sequelize.STRING
      } ,
      contact: {
        type: Sequelize.STRING
      } ,
      email: {
        type: Sequelize.STRING
      } ,
      provinceId: {
        type: Sequelize.INTEGER
      },
      routeId:{
        type: Sequelize.INTEGER
      },
      billTypeId:{
        type: Sequelize.INTEGER
      }  ,
      companyId:{
        type: Sequelize.INTEGER
      }  
    },{
      indexes:[       
       {
        unique: false,
        fields:['companyId']
      },
      ]
    }); 
    return Shop;
  };
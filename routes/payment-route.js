const router = require('express').Router();    
const db= require('../model'); 

db.Payment.hasMany(db.Order,{foreignKey:'orderId'});
db.Order.belongsTo(db.Payment,{foreignKey:"orderId"});

router.get('/company/:id',async(req,res)=>{
    try{    
        var {id }= req.params;
    const details=await db.Payment.findAll({
        where:{
            companyId:id
        }, 
        include:[ {model:db.Order, attributes: ['id','shopId','amount']}],
        order:[['orderId','DESC']]
    }) 
    if(details)  
         res.status(200).json({status:true,msg:`${details.length} details found!`,value:details});
    else
         res.status(200).json({status:false,msg:'No details found!',value:null})
    }catch(err){
     console.log(err);
         res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
    }
}); 


module.exports = router;
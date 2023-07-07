const router = require('express').Router();    
const db= require('../model'); 
const Sequelize=require('sequelize');  
const Op = Sequelize.Op;
 

router.get('/shop-n-products/:id',async(req,res)=>{
     try{    
          const {id} = req.params;
        
          const shops = db.Shop.findAll({
               attributes : ['id','name','code'],
               where: { companyId: id}
          }); 
          res.status(200).json({status:true,msg:`Fetch success`,value:{ shops}});
           
     }catch(err){
      console.log(err);
          res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
     }
}); 

router.get('/roles',async(req,res)=>{
     try{    
     const details=await db.UserRole.findAll({
          attributes : ['id','name'],
          where: { id: { [Op.gt]: 2 }}
     });
     if(details)  
          res.status(200).json({status:true,msg:`${details.length} details found!`,value:details});
     else
          res.status(200).json({status:false,msg:'No details found!',value:null})
     }catch(err){
      console.log(err);
          res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
     }
 }); 

 router.get('/departments',async(req,res)=>{
     try{    
     const details=await db.Department.findAll({
          where:{
               id:{
                    [Op.gt]:1
               }
          },
          attributes : ['id','name']
     });
     if(details)  
          res.status(200).json({status:true,msg:`${details.length} details found!`,value:details});
     else
          res.status(200).json({status:false,msg:'No details found!',value:null})
     }catch(err){
      console.log(err);
          res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
     }
 }); 

 router.get('/designations',async(req,res)=>{
     try{    
     const details=await db.Designation.findAll({
          where:{
               id:{
                    [Op.gt]:1
               }
          },
          attributes : ['id','name']
     });
     if(details)  
          res.status(200).json({status:true,msg:`${details.length} details found!`,value:details});
     else
          res.status(200).json({status:false,msg:'No details found!',value:null})
     }catch(err){
      console.log(err);
          res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
     }
 }); 
 

router.get('/country',async(req,res)=>{
    try{    
    const details=await db.Country.findAll();
    if(details)  
         res.status(200).json({status:true,msg:`${details.length} details found!`,value:details});
    else
         res.status(200).json({status:false,msg:'No details found!',value:null})
    }catch(err){
     console.log(err);
         res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
    }
}); 


router.get('/province',async(req,res)=>{
    try{    
    const details=await db.Province.findAll({
        include:[ {model:db.Country, attributes: ['code','name']}]
    }) ;
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
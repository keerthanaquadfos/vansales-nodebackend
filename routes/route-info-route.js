const router = require('express').Router();    
const db= require('../model'); 

   /* Relations */
   db.Van.hasMany(db.VanUserRoute,{foreignKey:'vanId'});
   db.VanUserRoute.belongsTo(db.Van,{foreignKey:"vanId"});

   db.UserAccount.hasMany(db.VanUserRoute,{foreignKey:'userId'});
   db.VanUserRoute.belongsTo(db.UserAccount,{foreignKey:"userId"});  

   db.Route.hasMany(db.VanUserRoute,{foreignKey:'routeId'});
   db.VanUserRoute.belongsTo(db.Route,{foreignKey:"routeId"});
    
   db.Company.hasMany(db.VanUserRoute,{foreignKey:'companyId'});
   db.VanUserRoute.belongsTo(db.Company,{foreignKey:"companyId"});

   db.Shop.hasMany(db.VanUserRoute,{foreignKey:'shopId'});
   db.VanUserRoute.belongsTo(db.Shop,{foreignKey:"shopId"});

router.get('/',async(req,res)=>{
    try{    
    const details=await db.VanUserRoute.findAll();
    if(details)  
         res.status(200).json({status:true,msg:`${details.length} details found!`,value:details});
    else
         res.status(200).json({status:false,msg:'No details found!',value:null})
    }catch(err){
     console.log(err);
         res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
    }
});
router.get('/company/:id',async(req,res)=>{
    try{   
     const {id} =req.params;  
     const details=await db.VanUserRoute.findAll({
        where:{companyId:id},
        include:[ 
            {model:db.Van, attributes: ['code','name']}, 
            {model:db.Route, attributes: ['name']}, 
            {model:db.UserAccount, attributes: ['email','name']}            
        ]
    }) ;

    if(details){
         res.status(200).json({status:true,msg:`${details.length} details found!`,value:details});
    }else
         res.status(200).json({status:false,msg:'No details found!',value:null})
    }catch(err){
        console.log(err);
         res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
    }
 });
 router.get('/user/:id',async(req,res)=>{
    try{   
     const {id} =req.params;  
     const details=await db.VanUserRoute.findAll({
        where:{userId:id},
        include:[ 
            {model:db.Van, attributes: ['code','name']}, 
            {model:db.Route, attributes: ['name'],include:[{model:db.Shop,attributes:['code','name','address','contact','email']}]}, 
            {model:db.UserAccount, attributes: ['email','name']}            
        ],attributes:['id']
    }) ;

    if(details){
         res.status(200).json({status:true,msg:`${details.length} details found!`,value:details});
    }else
         res.status(200).json({status:false,msg:'No details found!',value:null})
    }catch(err){
        console.log(err);
         res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
    }
 });



router.get('/:id',async(req,res)=>{
    try{   
     const {id} =req.params;  
     const details=await db.VanUserRoute.findOne({
        where:{
            id:id
        }         
    }) ;

    if(details){
         res.status(200).json({status:true,msg:`${details.length} details found!`,value:details});
    }else
         res.status(200).json({status:false,msg:'No details found!',value:null})
    }catch(err){
         res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
    }
 });
router.post('/',async(req,res)=>{
    try{
        const {shopId,companyId,userId,routeId,vanId}=req.body; 
        const details=await db.VanUserRoute.create({shopId,companyId,userId,routeId,vanId});
        if(details)
            res.status(201).json({status:true,msg:'Data saved successfully!',value:details});
        else
            res.status(200).json({status:false,msg:'Failed to save data!',value:null})
    }catch(err){
        console.log(err);
         res.status(500).json({status:false,msg:'Error occured while tring to save data!',value:err});
    }
 }); 
 router.put('/:id',async(req,res)=>{
    try{ 
        const {id}=req.params;
        const {companyId,userId,routeId,vanId}=req.body; 
        const details=await db.VanUserRoute.update({
            companyId,userId,routeId,vanId
        },{where:{id}});
        if(details)
            res.status(202).json({status:true,msg:'Data updated successfully!',value:details});
        else
            res.status(200).json({status:false,msg:'Failed to update data!',value:null})
    }catch(err){
         res.status(500).json({status:false,msg:'Error occured while tring to update data!',value:err});
    }
 });

 router.delete('/:id',async(req,res)=>{
    try{
        const {id}=req.params; 
        const details=await db.VanUserRoute.destroy({where:{id}}).catch((err)=>{
            res.status(404).json({status:false,msg:'Failed to delete details!',value:err})
        });
        if(details){
            res.status(203).json({status:true,msg:'Data deleted successfully!',value:details});
        }else
            res.status(200).json({status:false,msg:'Failed to delete data!',value:null})
    }catch(err){
        console.log(err)
         res.status(500).json({status:false,msg:'Error occured while tring to delete data!',value:err});
    }
 });
module.exports = router;
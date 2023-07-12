const router = require('express').Router();    
const db= require('../model'); 


db.Route.hasMany(db.Shop,{foreignKey:'routeId'});
db.Shop.belongsTo(db.Route,{foreignKey:"routeId"});

db.Province.hasMany(db.Shop,{foreignKey:'provinceId'});
db.Shop.belongsTo(db.Province,{foreignKey:"provinceId"});

db.BillType.hasMany(db.Shop,{foreignKey:'billTypeId'});
db.Shop.belongsTo(db.BillType,{foreignKey:"billTypeId"});

db.Company.hasMany(db.Shop,{foreignKey:'companyId'});
db.Shop.belongsTo(db.Company,{foreignKey:"companyId"});


router.get('/',async(req,res)=>{
    try{    
    const details=await db.Shop.findAll({
        include:[ {model:db.Route, attributes: ['code','name']},
        {model:db.Province, attributes: ['code','name']}, 
        {model:db.Company, attributes: ['name']},
        {model:db.BillType, attributes: ['name']}]
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



router.get('/:id',async(req,res)=>{
    try{   
     const {id} =req.params;  
     const details=await db.Shop.findOne({
        where:{
            id:id
        }         
    }).catch((err)=>{
        console.log(err); 
    });

    if(details){
         res.status(200).json({status:true,msg:`${details.length} details found!`,value:details});
    }else
         res.status(200).json({status:false,msg:'No details found!',value:null})
    }catch(err){
         res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
    }
 });
 router.get('/company/:id',async(req,res)=>{
    try{   
     const {id} =req.params;  
     const details=await db.Shop.findAll({
        where:{
            companyId:id
        },
        include:[ {model:db.Route, attributes: ['code','name']},
        {model:db.Province, attributes: ['code','name']}, 
        {model:db.Company, attributes: ['name']},
        {model:db.BillType, attributes: ['name']}]  
    });

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
         
        var {name,address,contact,email,code,provinceId,routeId,billTypeId,companyId, trn}=req.body; 
        var shopCount = await db.Shop.count({where:{companyId:companyId}});
        code = shopCount + 1;
        const details=await db.Shop.create({name,address,contact,email,code,provinceId,routeId,billTypeId,companyId,trn});
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
        const {name,address,contact,email,code,provinceId,routeId, billTypeId,companyId,trn}=req.body; 
        const details=await db.Shop.update({
            name,address,contact,email,code,provinceId,routeId,billTypeId,companyId,trn
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
        const details=await db.Shop.destroy({where:{id}}).catch((err)=>{
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
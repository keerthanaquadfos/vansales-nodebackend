const router = require('express').Router();    
const db= require('../model'); 
const Sequelize=require('sequelize');
const Op = Sequelize.Op;

db.Van.hasMany(db.VanStock,{foreignKey:'vanId'});
db.VanStock.belongsTo(db.Van,{foreignKey:"vanId"});

db.Product.hasMany(db.VanStock,{foreignKey:'productId'});
db.VanStock.belongsTo(db.Product,{foreignKey:"productId"}); 

db.UserAccount.hasMany(db.VanStock,{foreignKey:'userId'});
db.VanStock.belongsTo(db.UserAccount,{foreignKey:"userId"}); 

router.get('/',async(req,res)=>{
    try{    
    const details=await db.VanStock.findAll({
        include:[ {model:db.Van, attributes: ['code','name']},
        {model:db.Product, attributes: ['code','name']}], 
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
/* router.patch('/request',async(req,res)=>{
    try{  
        const {id, qty}=req.body;    
        const details = await db.VanStock.increment({ qty: qty},{where:{id}});
        if(details)
            res.status(202).json({status:true,msg:'Data updated successfully!',value:details});
        else
            res.status(200).json({status:false,msg:'Failed to update data!',value:null})
       
    }catch(err){
        console.log(err)
         res.status(500).json({status:false,msg:'Error occured while tring to update data!',value:err});
    }
 }); */ 

 router.get('/company/:id',async(req,res)=>{
    try{    
        const {id} =req.params;  
        const details=await db.VanStock.findAll({
        include:[ {model:db.Van, attributes: ['code','name']},
        {model:db.UserAccount, attributes: ['id','name']},
        {model:db.Product, attributes: ['code','name']}], 
        where:{
            companyId:id
        }
    });
    if(details){
        console.log(details); 
         res.status(200).json({status:true,msg:`${details.length} details found!`,value:details});
    }else
         res.status(200).json({status:false,msg:'No details found!',value:null})
    }catch(err){
     console.log(err);
         res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
    }
});
/* 
router.get('/:id',async(req,res)=>{
    try{   
     const {id} =req.params;  
     const details=await db.VanStock.findOne({
        where:{
            id:id
        }         
    }) 

    if(details){
         res.status(200).json({status:true,msg:`${details.length} details found!`,value:details});
    }else
         res.status(200).json({status:false,msg:'No details found!',value:null})
    }catch(err){
         res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
    }
 }); */
router.post('/',async(req,res)=>{
    try{
        const allotted = false; 
        const {companyId,vanId,productId,requestedQty,qty,userId,sold}=req.body; 
        const details=await db.VanStock.create({companyId,vanId,productId,requestedQty,userId,qty,allotted,sold});
        if(details){
        console.log(details);
            res.status(201).json({status:true,msg:'Data saved successfully!',value:details});
         } else
            res.status(200).json({status:false,msg:'Failed to save data!',value:null})
    }catch(err){
        console.log(err);
         res.status(500).json({status:false,msg:'Error occured while tring to save data!',value:err});
    }
 }); 

 router.put('/:id',async(req,res)=>{
    try{ 
        const {id}=req.params;
        const {companyId,vanId,productId,requestedQty,qty,allotted}=req.body; 
        const details=await db.VanStock.update({
            companyId,vanId,productId,requestedQty,qty,allotted
        },{where:{id}}) ;
        if(details)
            res.status(202).json({status:true,msg:'Data updated successfully!',value:details});
        else
            res.status(200).json({status:false,msg:'Failed to update data!',value:null})
    }catch(err){
         res.status(500).json({status:false,msg:'Error occured while tring to update data!',value:err});
    }
 });

 router.patch('/:id',async(req,res)=>{
    try{ 
        const {id}=req.params;
        var allotted =true 
        var {qty} = req.body;
        const details=await db.VanStock.update({
           allotted,qty
        },{where:{id}}) ;
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
        const details=await db.VanStock.destroy({where:{id}});
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
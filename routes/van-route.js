const router = require('express').Router();    
const db= require('../model'); 

db.UserAccount.hasMany(db.Van,{foreignKey:'userId'});
db.Van.belongsTo(db.UserAccount,{foreignKey:"userId"});


router.get('/',async(req,res)=>{
    try{    
    const details=await db.Van.findAll({
        include:[ {model:db.UserAccount, attributes: ['id','email']}], 
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


router.get('/company/:id',async(req,res)=>{
    try{   
     const {id} =req.params;  
     const details=await db.Van.findAll({
        where:{
            companyId:id
        },include:[ {model:db.UserAccount, attributes: ['id','email']}]         
    });

    if(details){
         res.status(200).json({status:true,msg:`${details.length} details found!`,value:details});
    }else
         res.status(200).json({status:false,msg:'No details found!',value:null})
    }catch(err){
         res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
    }
 });
router.get('/:id',async(req,res)=>{
    try{   
     const {id} =req.params;  
     const details=await db.Van.findOne({
        where:{
            id:id
        },include:[ {model:db.UserAccount, attributes: ['id','email']}]         
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
        const {name,code, companyId}=req.body; 
        const details=await db.Van.create({name,code,companyId});
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
        const {name,code,companyId}=req.body; 
        const details=await db.Van.update({
            name,code,companyId
        },{where:{id}}).catch((err)=>{
            res.status(404).json({status:false,msg:'Failed to update details!',value:err})
        });
        if(details)
            res.status(202).json({status:true,msg:'Data updated successfully!',value:details});
        else
            res.status(200).json({status:false,msg:'Failed to update data!',value:null})
    }catch(err){
         res.status(500).json({status:false,msg:'Error occured while tring to update data!',value:err});
    }
 });

 router.put('/:id/assign-employee',async(req,res)=>{
    try{ 
        const {id}=req.params;
        const {vanId,userId}=req.body; 
        const details=await db.Van.update({
            vanId,userId
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
        const details=await db.Van.destroy({where:{id}}).catch((err)=>{
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
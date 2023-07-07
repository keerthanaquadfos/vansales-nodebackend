const router = require('express').Router();    
const db= require('../model'); 

db.ComplaintType.hasMany(db.Complaint,{foreignKey:'complaintTypeId'});
db.Complaint.belongsTo(db.ComplaintType,{foreignKey:"complaintTypeId"});

db.Shop.hasMany(db.Complaint,{foreignKey:'shopId'});
db.Complaint.belongsTo(db.Shop,{foreignKey:"shopId"});


db.Product.hasMany(db.Complaint,{foreignKey:'productId'});
db.Complaint.belongsTo(db.Product,{foreignKey:"productId"});

router.get('/types',async(req,res)=>{
    try{    
    const details=await db.ComplaintType.findAll() 
    if(details)  
         res.status(200).json({status:true,msg:`${details.length} details found!`,value:details});
    else
         res.status(200).json({status:false,msg:'No details found!',value:null})
    }catch(err){
     console.log(err);
         res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
    }
});
router.get('/',async(req,res)=>{
    try{    
    const details=await db.Complaint.findAll({
        include:[ {model:db.ComplaintType, attributes: ['id','name']}, 
        {model:db.Product, attributes: ['code','name']}, 
        {model:db.Shop, attributes: ['code','name']},]
    }).catch((err)=>{
        res.status(404).json({status:false,msg:'Failed to fetch details!',value:err})
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
        var {id }= req.params;
    const details=await db.Complaint.findAll({
        where:{
            companyId:id
        }, 
        include:[ {model:db.ComplaintType, attributes: ['id','name']}, 
        {model:db.Product, attributes: ['code','name']}, 
        {model:db.Shop, attributes: ['code','name']},] ,order:[['scheduledAt','DESC']]
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
router.get('/:id',async(req,res)=>{
    try{   
     const {id} =req.params;  
     const details=await db.Complaint.findOne({
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
router.post('/',async(req,res)=>{
    try{
        const {companyId,complaintTypeId,shopId,productId,remarks,status,scheduledAt}=req.body; 
        const details=await db.Complaint.create({companyId,complaintTypeId,shopId,productId,remarks,status,scheduledAt});
        if(details)
            res.status(201).json({status:true,msg:'Data saved successfully!',value:details});
        else
            res.status(200).json({status:false,msg:'Failed to save data!',value:null})
    }catch(err){
        console.log(err);
         res.status(500).json({status:false,msg:'Error occured while tring to save data!',value:err});
    }
 }); 

 router.post('/',async(req,res)=>{
    try{
        const {companyId,complaintTypeId,shopId,productId,remarks,status,scheduledAt}=req.body; 
        const details=await db.ComplaintType.create({companyId,complaintTypeId,shopId,productId,remarks,status,scheduledAt});
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
        const {complaintTypeId,shopId,productId,remarks,status,scheduledAt}=req.body; 
        const details=await db.Complaint.update({
            complaintTypeId,shopId,productId,remarks,status,scheduledAt
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

 router.delete('/:id',async(req,res)=>{
    try{
        const {id}=req.params; 
        const details=await db.Complaint.destroy({where:{id}}).catch((err)=>{
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
const router = require('express').Router();    
const db= require('../model'); 

db.Country.hasMany(db.Province,{foreignKey:'countryId'});
db.Province.belongsTo(db.Country,{foreignKey:"countryId"});

router.get('/',async(req,res)=>{
    try{    
    const details=await db.Province.findAll({
        include:[ {model:db.Country, attributes: ['id','name']}]
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

router.get('/:id',async(req,res)=>{
    try{   
     const {id} =req.params;  
     const details=await db.Province.findOne({
        include:[ {model:db.Country, attributes: ['id','name']}],
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
        const {countryId,code,name}=req.body; 
        const item  = await db.Province.count();
        const details=await db.Province.create({countryId:countryId,code:code,name:name,id:(item+1)});
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
        const {countryId,code,name}=req.body; 
        const details=await db.Province.update({
            countryId,code,name
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
        const details=await db.Province.destroy({where:{id}});
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
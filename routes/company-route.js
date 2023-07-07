const router = require('express').Router();    
const db= require('../model'); 


db.Province.hasMany(db.Company,{foreignKey:'provinceId'});
db.Company.belongsTo(db.Province,{foreignKey:"provinceId"});

db.Country.hasMany(db.Province,{foreignKey:'countryId'});
db.Province.belongsTo(db.Country,{foreignKey:"countryId"});

router.get('/',async(req,res)=>{
    try{    
    const details=await db.Company.findAll({
        include:[ {model:db.Province, attributes: ['name']}]
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
     const details=await db.Company.findOne({
        where:{
            id:id
        }, include:[ {model:db.Province, attributes: ['name'], include:[ {model:db.Country, attributes: ['name']}],}],  
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
        const {name,email,address,contact,maxUsers,provinceId,password}=req.body; 
        const details=await db.Company.create({name,email,address,contact,maxUsers,provinceId});
        if(details){
            const adminUser = {name:name,email:email,roleId:2,companyId:details.id,designationId:1,departmentId:1,active:true,password:password};
            await db.UserAccount.create(adminUser);
            res.status(201).json({status:true,msg:'Data saved successfully!',value:details});
        }else
            res.status(200).json({status:false,msg:'Failed to save data!',value:null})
    }catch(err){
        console.log(err);
         res.status(500).json({status:false,msg:'Error occured while tring to save data!',value:err});
    }
 }); 
 router.put('/:id',async(req,res)=>{
    try{ 
        const {id}=req.params;
        const {name,email,address,contact,maxUsers,provinceId}=req.body; 
        const details=await db.Company.update({
            name,email,address,contact,maxUsers,provinceId
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
        const details=await db.Company.destroy({where:{id}}).catch((err)=>{
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
const router = require('express').Router();    
const db= require('../model'); 
const Sequelize=require('sequelize');  
const moment = require('moment'); 
const order = require('../model/order');
const Op = Sequelize.Op;
db.UserAccount.hasMany(db.Attendance,{foreignKey:'employeeId'});
db.Attendance.belongsTo(db.UserAccount,{foreignKey:"employeeId"});

router.get('/',async(req,res)=>{
    try{    
    const details=await db.Attendance.findAll({
        include:[ {model:db.UserAccount, attributes: ['id','email']}]
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

router.get('/company/:id',async(req,res)=>{
    try{    
        const {id} =req.params;   
        const details=await db.Attendance.findAll({
            include:[ {model:db.UserAccount, attributes: ['id','email'], where:{companyId:id}}],
            order:[['createdAt','DESC']]
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

 router.get('/day/:id',async(req,res)=>{
    try{   
         
        const dtr =  new Date()
        var  string  = dtr.getUTCFullYear()+"-"+(dtr.getUTCMonth()+1).toString().padStart(2,'0')+"-"+dtr.getUTCDate().toString().padStart(2,'0');
     const {id} =req.params;   
     const details=await db.Attendance.findOne({
        where:{
            employeeId:id, 
            checkIn :string 
        }         
    });  
   
    //var details = await db.sequelize.query('SELECT * FROM attendances WHERE date(checkIn)=date('+dtr+')') ;
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
     const details=await db.Attendance.findOne({
        where:{
            id:id
        }         
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


router.post('/',async(req,res)=>{
    try{
        const {employeeId,checkIn,checkInTime,checkinLat,checkinLong,odmeter}=req.body; 
        const details=await db.Attendance.create({employeeId,checkIn,checkInTime,checkinLat,checkinLong,odmeter});
        if(details)
            res.status(201).json({status:true,msg:'Data saved successfully!',value:details});
        else
            res.status(200).json({status:false,msg:'Failed to save data!',value:null})
    }catch(err){
        console.log(err);
         res.status(500).json({status:false,msg:'Error occured while tring to save data!',value:err});
    }
 }); 
 router.patch('/',async(req,res)=>{
    try{
       
        const {id,checkOut,checkOutTime,checkOutLat,checkOutLong,odmeterEnd}=req.body; 
        const details=await db.Attendance.update({
           checkOut,checkOutTime,checkOutLat,checkOutLong,odmeterEnd
        },{where:{id}});
        if(details){
                const attendance=await db.Attendance.findOne({
                    where:{
                        id:id
                    }         
                }) ;
            res.status(201).json({status:true,msg:'Data saved successfully!',value:attendance});
            }else
            res.status(200).json({status:false,msg:'Failed to save data!',value:null})
    }catch(err){
        console.log(err);
         res.status(500).json({status:false,msg:'Error occured while tring to save data!',value:err});
    }
 }); 
   
 router.delete('/:id',async(req,res)=>{
    try{
        const {id}=req.params; 
        const details=await db.Attendance.destroy({where:{id}}).catch((err)=>{
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
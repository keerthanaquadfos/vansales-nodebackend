const router = require('express').Router();    
const db= require('../model'); 
const Sequelize=require('sequelize');
const Op = Sequelize.Op;

db.Category.hasMany(db.Product,{foreignKey:'categoryId'});
db.Product.belongsTo(db.Category,{foreignKey:"categoryId"});

db.SubCategory.hasMany(db.Product,{foreignKey:'subCategoryId'});
db.Product.belongsTo(db.SubCategory,{foreignKey:"subCategoryId"});

router.get('/',async(req,res)=>{
    try{    
     const products=await db.Product.findAll({
             include:[
                {model:db.Category,attributes:['name',]}, 
                {model:db.SubCategory, attributes: ['name']}, 
             ],attributes:['id','categoryId','subCategoryId','code','name','price','taxPercentage','description']
             ,order:[['name','ASC']]
         }).catch((err)=>{
             console.log(err); 
     });
     
    if(products)  
         res.status(200).json({status:true,msg:`${products.length} details found!`,value:products});
    else
         res.status(200).json({status:false,msg:'No details found!',value:null})
    }catch(err){
     console.log(err);
         res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
    }
});
router.get('/company/:id',async(req,res)=>{
    try{ 
     const {id}=req.params; 
     const products=await db.Product.findAll({
             include:[
                {model:db.Category,attributes:['name',]}, 
                {model:db.SubCategory, attributes: ['name']}, 
             ],attributes:['id','categoryId','subCategoryId','code','name','price','taxPercentage','description'],
             where:{
                companyId:id
            },order:[['name','ASC']]
         }).catch((err)=>{
             console.log(err); 
     });
     
    if(products)  
         res.status(200).json({status:true,msg:`${products.length} details found!`,value:products});
    else
         res.status(200).json({status:false,msg:'No details found!',value:null})
    }catch(err){
     console.log(err);
         res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
    }
});

router.put('/:id',async(req,res)=>{
    try{ 
        const {id}=req.params;
        const {categoryId,subCategoryId,code,name,price,taxPercentage,description,companyId}=req.body;
        const details=await db.Product.update({
            categoryId,subCategoryId,code,name,price,taxPercentage,description,companyId
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
 

router.post('/',async(req,res)=>{
    try{
        const {categoryId,subCategoryId,code,name,price,taxPercentage,description, companyId}=req.body; 
        const details=await db.Product.create({categoryId,subCategoryId,code,name,price,taxPercentage,description,companyId});
        if(details)
            res.status(201).json({status:true,msg:'Data saved successfully!',value:details});
        else
            res.status(200).json({status:false,msg:'Failed to save data!',value:null})
    }catch(err){
        console.log(err);
         res.status(500).json({status:false,msg:'Error occured while tring to save data!',value:err});
    }
 });  
 router.get('/:id',async(req,res)=>{
    try{   
     const {id} =req.params;  
     const products=await db.Product.findAll({
        where:{
            id:id
        },
        include:[
           {where:{id :{ [Op.lt]: 6}},model:db.Category,attributes:['name']}, 
           {model:db.SubCategory, attributes: ['name']}, 
        ],attributes:['id','categoryId','subCategoryId','code','name','price','taxPercentage']
        ,order:[['name','ASC']]
    }) ;
    if(details){
         res.status(200).json({status:true,msg:`${details.length} details found!`,value:details});
    }else
         res.status(200).json({status:false,msg:'No details found!',value:null})
    }catch(err){
         res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
    }
 });
 router.delete('/:id',async(req,res)=>{
    try{
        const {id}=req.params; 
        const details=await db.Product.destroy({where:{id}}).catch((err)=>{
            res.status(404).json({status:false,msg:'Failed to delete details!',value:err})
        });
        if(details){
            res.status(203).json({status:true,msg:'Data deleted successfully!',value:details});
        }else
            res.status(200).json({status:false,msg:'Failed to delete data!',value:null})
    }catch(err){
         res.status(500).json({status:false,msg:'Error occured while tring to delete data!',value:err});
    }
 });
module.exports = router;
const router = require('express').Router();    
const db= require('../model'); 
const Sequelize=require('sequelize');
const Op = Sequelize.Op;

db.PurchaseReturn.hasMany(db.ReturnItem,{foreignKey:'purchaseReturnId'});
db.ReturnItem.belongsTo(db.PurchaseReturn,{foreignKey:"purchaseReturnId"});


db.Order.hasMany(db.PurchaseReturn,{foreignKey:'orderId'});
db.PurchaseReturn.belongsTo(db.Order,{foreignKey:"orderId"});

db.Product.hasMany(db.OrderDetail,{foreignKey:'productId'});
db.OrderDetail.belongsTo(db.Product,{foreignKey:"productId"});

db.Shop.hasMany(db.Order,{foreignKey:'shopId'});
db.Order.belongsTo(db.Shop,{foreignKey:"shopId"});

router.get('/',async(req,res)=>{
    try{    
     const products=await db.PurchaseReturn.findAll({
             include:[
                {model:db.OrderDetail, include:[ {model:db.Product, attributes: ['name']},
                {model:db.Shop, attributes: ['name']},
                {model:db.Order, attributes: ['orderNo','orderDate']}],
                attributes:['productId','orderdQty','deliverableQty','amount']},  
            ],attributes:['id','ordeId','returnDate','amount','status']
             ,order:[['orderDate','DESC']]
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
     const products=await db.PurchaseReturn.findAll({
             include:[
                {model:db.ReturnItem, include:[ {model:db.Product, attributes: ['name','qty']},
                {model:db.Shop, attributes: ['name']},
                {model:db.Order, attributes: ['orderNo','orderDate']}],
                attributes:['productId','orderdQty','deliverableQty','amount']},  
            ],attributes:['id','ordeId','returnDate','amount','status']
             ,order:[['orderDate','DESC']]
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
router.post('/',async(req,res)=>{
    try{
        const {companyId,orderId,returnDate,amount,status,returns}=req.body; 
        const details=await db.PurchaseReturn.create({companyId,orderId,returnDate,amount,status});
        if(details){ 
            var array_copy = returns.map((element) => {  
                return {productId:element.id, qty:element.qty, price:element.amount, purchaseReturnId:details.id};
              }); 
            var od = await db.ReturnItem.bulkCreate(array_copy,{ returning: true})
            if(!od){ 
                res.status(200).json({status:false,msg:'Failed to save data!',value:null})
            }
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
        const {ordeId,returnDate,amount,status,returns}=req.body;
        const details=await db.PurchaseReturn.update({
            ordeId,returnDate,amount,status
        },{where:{id}}).catch((err)=>{
            res.status(404).json({status:false,msg:'Failed to update details!',value:err})
        });
        if(details){
            await db.PurchaseReturn.destroy({where:{orderId:id}});
            var od = await db.PurchaseReturn.bulkCreate(returns,{ returning: true})
            if(!od){ 
                res.status(200).json({status:false,msg:'Failed to save data!',value:null})
            }
            res.status(202).json({status:true,msg:'Data updated successfully!',value:details});
        }else
            res.status(200).json({status:false,msg:'Failed to update data!',value:null})
    }catch(err){
        console.log(err)
         res.status(500).json({status:false,msg:'Error occured while tring to update data!',value:err});
    }
 });
 router.patch('/:id',async(req,res)=>{
    try{ 
        const {id}=req.params;
        const {status,orderdBy}=req.body;
        const details=await db.PurchaseReturn.update({
             status,orderdBy
        },{where:{id}}).catch((err)=>{
            res.status(404).json({status:false,msg:'Failed to update details!',value:err})
        });
        if(details){ 
            res.status(202).json({status:true,msg:'Data updated successfully!',value:details});
        }else
            res.status(200).json({status:false,msg:'Failed to update data!',value:null})
    }catch(err){
        console.log(err)
         res.status(500).json({status:false,msg:'Error occured while tring to update data!',value:err});
    }
 });
 router.get('/:id',async(req,res)=>{
    try{   
     const {id} =req.params;  
     const details=await db.PurchaseReturn.findAll({
        where:{
            id:id
        },
        include:[
            {model:db.OrderDetail, include:[ {model:db.Product, attributes: ['name']},
            {model:db.Shop, attributes: ['name']},
            {model:db.Order, attributes: ['orderNo','orderDate']}],
            attributes:['productId','orderdQty','deliverableQty','amount']},  
         ],attributes:['id','ordeId','returnDate','amount','status']
    }).catch((err)=>{
        console.log(err); 
    });

    if(details){
         res.status(200).json({status:true,msg:`${details.length} details found!`,value:details});
    }else
         res.status(200).json({status:false,msg:'No details found!',value:null})
    }catch(err){
        console.log(err); 
         res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
    }
 });

 router.delete('/:id',async(req,res)=>{
    try{
        const {id}=req.params; 
        const details=await db.PurchaseReturn.destroy({where:{id}}).catch((err)=>{
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
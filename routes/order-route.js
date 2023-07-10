const router = require('express').Router();    
const db= require('../model'); 
const Sequelize=require('sequelize');
const Op = Sequelize.Op;

db.Order.hasMany(db.OrderDetail,{foreignKey:'orderId'});
db.OrderDetail.belongsTo(db.Order,{foreignKey:"orderId"});

db.Product.hasMany(db.OrderDetail,{foreignKey:'productId'});
db.OrderDetail.belongsTo(db.Product,{foreignKey:"productId"});

db.Shop.hasMany(db.Order,{foreignKey:'shopId'});
db.Order.belongsTo(db.Shop,{foreignKey:"shopId"});

db.Order.hasMany(db.Company,{foreignKey:'companyId'});
db.Company.belongsTo(db.Order,{foreignKey:"companyId"});

db.UserAccount.hasMany(db.Order,{foreignKey:'orderdBy'});
db.Order.belongsTo(db.UserAccount,{foreignKey:"orderdBy"});

 

router.get('/',async(req,res)=>{
    try{    
     const products=await db.Order.findAll({
             include:[
                {model:db.OrderDetail, include:[ {model:db.Product, attributes: ['name']}],
                attributes:['productId','orderdQty','deliverableQty','amount']}, 
                {model:db.Shop, attributes: ['name']} 
             ],attributes:['id','orderNo','orderDate','shopId','tax','amount','orderdBy','status','deliveryDate']
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
         const {orderDate,shopId,companyId,tax,amount,orderdBy,orders,deliveryDate}=req.body;  
        var orderCount = await db.Order.count({where: {companyId:companyId}});
        var status = 1;
        var orderNo = orderCount+1; 
        if(orders==null) return res.status(200).json({status:false,msg:'Order details not found!',value:null})
        const details=await db.Order.create({orderNo,orderDate,companyId,shopId,tax,amount,orderdBy,status,deliveryDate});
        if(details){
            var array_copy = orders.map((element) => {  
                return {productId:element.productId,amount:element.amount, orderdQty:element.orderdQty,orderId:details.id,price:element.price,deliverableQty:element.deliverableQty};
              }); 
            var od = await db.OrderDetail.bulkCreate(array_copy,{ returning: true})
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
 router.post('/new-sale',async(req,res)=>{
    try{ 

        const {orderDate,shopId,companyId,tax,amount,orderdBy,orders,deliveryDate,vanId}=req.body;  
        const result = await db.sequelize.transaction(async (t) => {
            var orderCount = await db.Order.count({where: {companyId:companyId}});
            var status = 5;
            var orderNo = orderCount+1;  
            const details=await db.Order.create({orderNo,orderDate,companyId,shopId,tax,amount,orderdBy,status,deliveryDate,vanId});  
            var vstock = await db.VanStockRequest.bulkCreate({companyId:companyId,vanId:vanId,userId:orderdBy,allotted:true,sold:true});
            var stock = [];
            var array_copy = orders.map((element) => {  
                const stockInfo = {vanStockRequestId:vstock.id,productId:element.productId,productName:"",requestedQty:element.orderdQty,qty:(-1*element.orderdQty),allotted:true,sold:true};
                stock.push(stockInfo);
                return {productId:element.productId, amount:element.amount, orderdQty:element.orderdQty,orderId:details.id,amount:element.price,deliverableQty:element.deliverableQty};
            }); 
            await db.OrderDetail.bulkCreate(array_copy,{ returning: false})
            await db.VanStockItem.bulkCreate(stock,{returning: false});
            return details;
        }); 
        if(result)
        {
            res.status(201).json({status:true,msg:'Data saved successfully!',value:result});
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
        const {status,orders}=req.body;
     
        const details=await db.Order.update({
            status
        },{where:{id}});
        if(details){
            await db.OrderDetail.destroy({where:{orderId:id}});
            var od = await db.OrderDetail.bulkCreate(orders,{ returning: true})
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
        const {statuId}=req.body;
        const curItem=await db.Order.findOne({
            where:{
                id:id
            }         
        });
        if(curItem){
           curItem.status = statuId;
           curItem.orderdBy = orderdBy;
           const details=await db.Order.update(curItem) ;
           if(details){ 
               res.status(202).json({status:true,msg:'Data updated successfully!',value:details});
           }else
               res.status(200).json({status:false,msg:'Failed to update data!',value:null})
        }else{
            res.status(200).json({status:false,msg:'No such order found!',value:null})
        }
        
    }catch(err){
        console.log(err)
         res.status(500).json({status:false,msg:'Error occured while tring to update data!',value:err});
    }
 });

 router.get('/:id',async(req,res)=>{
    try{   
     const {id} =req.params;  
     const details=await db.Order.findOne({
        where:{
            id:id
        },
        include:[
            {model:db.OrderDetail, include:[ {model:db.Product, attributes: ['name']}],
            attributes:['productId','orderdQty','deliverableQty','amount']}, 
            {model:db.Shop, attributes: ['name']} 
         ],order:[['orderDate','DESC']],attributes:['id','orderNo','orderDate','shopId','tax','amount','orderdBy','status','deliveryDate']
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
 
 router.get('/order-list/:id/:status',async(req,res)=>{
    try{   
        const {id, status} =req.params;  
        const details=await db.Order.findAll({
           where:{
              status:status,  companyId:id
           },
           include:[
               {model:db.OrderDetail, include:[ {model:db.Product, attributes: ['name']}],
               attributes:['productId','orderdQty','deliverableQty','amount']}, 
               {model:db.Shop, attributes: ['name']} 
            ],order:[ ['orderNo', 'DESC'],],attributes:['id','orderNo','orderDate','shopId','tax','amount','orderdBy','status','deliveryDate'],

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

 router.get('/sales/:companyId',async(req,res)=>{
    try{   
     const {companyId} =req.params;  
     const details=await db.Order.findAll({
        where:{
            status:5, companyId:companyId
        },
        include:[
            {model:db.OrderDetail, include:[ {model:db.Product, attributes: ['name']}],
            attributes:['productId','orderdQty','deliverableQty','amount']},          
            {model:db.Shop, attributes: ['name','address','contact','email','trn'],include:[ {model:db.Province, attributes: ['name'],
            include:[ {model:db.Country, attributes: ['name']}]}]} ,
             {model:db.UserAccount, attributes: ['name']}, 
         ],order:[['orderDate','DESC']],attributes:['id','orderNo','orderDate','shopId','tax','amount','orderdBy','status','deliveryDate']
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
        const details=await db.Order.destroy({where:{id}}) ;
        if(details){
            res.status(203).json({status:true,msg:'Data deleted successfully!',value:details});
        }else
            res.status(200).json({status:false,msg:'Failed to delete data!',value:null})
    }catch(err){
         res.status(500).json({status:false,msg:'Error occured while tring to delete data!',value:err});
    }
 });
module.exports = router;
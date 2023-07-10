const router = require('express').Router();    
const db= require('../model');  

 
db.VanStockRequest.hasMany(db.VanStockItem,{foreignKey:'vanStockRequestId'});
db.VanStockItem.belongsTo(db.VanStockRequest,{foreignKey:"vanStockRequestId"});

db.Van.hasMany(db.VanStockRequest,{foreignKey:'vanId'});
db.VanStockRequest.belongsTo(db.Van,{foreignKey:"vanId"});

db.UserAccount.hasMany(db.VanStockRequest,{foreignKey:'userId'});
db.VanStockRequest.belongsTo(db.UserAccount,{foreignKey:"userId"});

router.get('/product-stock/:id/:companyId',async(req,res)=>{
    try{
        const {id,companyId} = req.params;
       
        const query ='SELECT "vans"."id" as "vanId", "vanStockItems"."productName",'+
        '"vanStockItems"."productId",SUM("vanStockItems"."qty") as "qty"'+
        'FROM "vanStockRequests" LEFT JOIN "vanStockItems"'+
        'ON "vanStockRequests"."id" = "vanStockItems"."vanStockRequestId"'+
        'LEFT OUTER JOIN vans ON vans.id = "vanStockRequests"."vanId"'+
        'LEFT OUTER JOIN useraccounts ON useraccounts.id = "vanStockRequests"."userId"'+
        'WHERE "vanStockRequests"."companyId" =  (:companyId) AND "useraccounts"."id"=  (:id)'+
        'GROUP BY "vans"."id","vanStockItems"."productId",'+
        '"vanStockItems"."productName","vanStockItems"."productId"';
        const details = await db.sequelize.query(query ,{
            replacements: {id: id, companyId:companyId},
            type: db.sequelize.QueryTypes.SELECT
        });
        if(details){
            res.status(200).json({status:true,msg:`${details.length} details found!`,value:details});
       }else
            res.status(200).json({status:false,msg:'No details found!',value:null})
    }catch(err){
        console.log(err);
        res.status(500).json({status:false,msg:'Error occured while tring to fetch data!',value:err});
    }
})

router.get('/company/:id/:userId',async(req,res)=>{
    try{   
     const {id, userId} =req.params;  
     const details=await db.VanStockRequest.findAll({
        where:{
            companyId:id, userId:userId
        },
        include:[{model:db.VanStockItem, group: ['productId'], attributes:['id','vanStockRequestId','productId','productName','requestedQty', 
        'qty','allotted','sold']},
    {model:db.Van, attributes:['code','name']},
    {model:db.UserAccount, attributes:['name','email']}],
        attributes:['id','requestNo','allotted','companyId','userId','vanId'] ,
          
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
        const {vanId, companyId, userId, stockItems}=req.body;  
        const result = await db.sequelize.transaction(async (t) => {
            const lastItem = await db.VanStockRequest.findOne({where:{companyId:companyId, userId:userId}, order: [ [ 'id', 'DESC' ]]});
            var rNo =1;
            if(lastItem) rNo = (lastItem.requestNo+1);
            const inserted=await db.VanStockRequest.create({requestNo:rNo,vanId:vanId,companyId: companyId,userId: userId, allotted:1});
            var items = stockItems.map((e) => {  
                return {vanStockRequestId:inserted.id,productId:e.productId,productName:e.productName,
                    requestedQty:e.requestedQty,qty:e.qty,allotted:false,sold:false};
            });
            await db.VanStockItem.bulkCreate(items);
            return inserted;        
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
 router.put('/',async(req,res)=>{ 
    try{
        const {id, stockItems}=req.body;  
        const result = await db.sequelize.transaction(async (t) => {
            const curItems = await db.VanStockItem.findAll({where:{vanStockRequestId:id}});  
            var result = [] ;     
            if(stockItems.length == curItems.length)
                await db.VanStockRequest.update({allotted:3},{where:{id:id}});            
            if(stockItems.length < curItems.length)
                await db.VanStockRequest.update({allotted:2},{where:{id:id}});

            stockItems.forEach(async e=>{          
                var res  = await db.VanStockItem.update(e,{where:{id:e.id}});
                result.push(res);
            });
            return result;        
        });  
        if(result)
        {
            res.status(201).json({status:true,msg:'Data saved successfully!',value:1});
        }else
            res.status(200).json({status:false,msg:'Failed to save data!',value:null})
    }catch(err){
        console.log(err); 
        res.status(500).json({status:false,msg:'Error occured while tring to save data!',value:err});
    }
 }); 

 router.put('/accept-all/:id',async(req,res)=>{ 
    try{  
        const {id}=req.params;  
        const result = await db.sequelize.transaction(async (t) => {
            const curItems = await db.VanStockItem.findAll({where:{vanStockRequestId:id}});   
            await db.VanStockRequest.update({allotted:3},{where:{id:id}});   
            const records = curItems.map(result => result.dataValues)
            records.forEach(async e=>{   
                console.log(e);
                e.qty=e.requestedQty;  
                e.allotted = true;     
                await db.VanStockItem.update(e,{where:{id:e.id}}); 
            });
            return 1;        
        });  
        if(result)
        {
            res.status(201).json({status:true,msg:'Data saved successfully!',value:1});
        }else
            res.status(200).json({status:false,msg:'Failed to save data!',value:null})
    }catch(err){
        console.log(err); 
        res.status(500).json({status:false,msg:'Error occured while tring to save data!',value:err});
    }
 }); 
 
module.exports = router;
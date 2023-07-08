const router = require('express').Router();    
const db= require('../model'); 
require('dotenv').config();
const Sequelize=require('sequelize');
const privateKey=process.env.PRIVATE_KEY; 
const Op = Sequelize.Op;

db.UserRole.hasMany(db.UserAccount,{foreignKey:'roleId'});
db.UserAccount.belongsTo(db.UserRole,{foreignKey:"roleId"}); 

db.Company.hasMany(db.UserAccount,{foreignKey:'companyId'});
db.UserAccount.belongsTo(db.Company,{foreignKey:"companyId"}); 

db.Designation.hasMany(db.UserAccount,{foreignKey:'designationId'});
db.UserAccount.belongsTo(db.Designation,{foreignKey:"designationId"}); 

db.Department.hasMany(db.UserAccount,{foreignKey:'departmentId'});
db.UserAccount.belongsTo(db.Department,{foreignKey:"departmentId"}); 


router.get('/',async(req,res)=>{
  try{    
  const details=await db.UserAccount.findAll({ 
    include:[ {model:db.UserRole, attributes: ['name','id']},
    {model:db.Company, attributes: ['name','id'],},
    {model:db.Designation, attributes: ['name','id']},
    {model:db.Department, attributes: ['name','id']}],
    where: { roleId: { [Op.ne]: 1 }},attributes:['id','email', 'active']
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
  const details=await db.UserAccount.findAll({ 
    include:[ {model:db.UserRole, attributes: ['name','id']},
    {model:db.Company, attributes: ['name','id']},
    {model:db.Designation, attributes: ['name','id']},
    {model:db.Department, attributes: ['name','id']}],
    where: {companyId : id , roleId:{[Op.gt]:2}},attributes:['id','email','name','active']
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

router.get('/:shopId',async(req,res)=>{
  try{    
    const {id} =req.params.shopId;  
  const details=await db.UserAccount.findAll({ 
    include:[ {model:db.UserRole, attributes: ['name','id']},
    {model:db.Company, attributes: ['name','id']},
    {model:db.Designation, attributes: ['name','id']},
    {model:db.Department, attributes: ['name','id']}],
    where: { roleId: { [Op.gt]: 2},shopId: id},attributes:['id','email', 'active']
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

router.post('/',async(req,res)=>{
    try{  
        

        const {name,roleId,email,password,companyId, departmentId, designationId, active}=req.body;     
        const user = await db.UserAccount.findOne({where:{email:email}});
        if(user){
          return res.status(201).json({status:false,msg:'Email alreay taken, please choose a diffrent one',value:null});
        }
        
        const company = await db.Company.findOne({where:{id:companyId}});
        var users = await db.UserAccount.count({ col: 'id', where: { companyId: companyId } });
         console.clear();
         console.log(company,users);
        if((company.maxUsers+1) < users){
          return res.status(201).json({status:false,msg:'Already reached maximum allowed users, contact your provider!',value:null});
         }
        const details=await db.UserAccount.create({name, roleId,companyId,email,password, departmentId, designationId, active});
        if(details)
            return res.status(201).json({status:true,msg:'Data saved successfully!',value:details});
        else
            return res.status(200).json({status:false,msg:'Failed to save data!',value:null})
    }catch(err){
        if (err.name === 'SequelizeUniqueConstraintError') { 
          return res.status(403).json({status:false,msg, message: "Email already exists",value:err});
        } 
        return res.status(500).json({status:false,msg:'Error occured while tring to save data!',value:err});
    }
 });

 router.put('/:id',async(req,res)=>{
  try{  
      const {id}=req.params;
      const {name,roleId,companyId,email,password, departmentId, designationId,active}=req.body; 
      console.clear()
      console.log(req.body);
      const details=await db.UserAccount.update(
        {
        name,roleId,companyId,email,password, departmentId, designationId, active
        },
        {where:{id}
      });
      if(details)
          return res.status(201).json({status:true,msg:'Data saved successfully!',value:details});
      else
          return res.status(200).json({status:false,msg:'Failed to save data!',value:null})
  }catch(err){
    if (err.name === 'SequelizeUniqueConstraintError') { 
      return res.status(403).json({status:false,msg, message: "Email already exists",value:err});
    } 
    return res.status(500).json({status:false,msg:'Error occured while tring to save data!',value:err});
  }
});

 router.post('/authenticate',async (req,res)=>{
    try{
        const { email,password} =req.body;  
        console.log(email,password)
        const userData=await db.UserAccount.findOne({
          include:[ {model:db.UserRole, attributes: ['name']}, {model:db.Company, attributes: ['name']}],
          where:{email:email,password:password,active:true}}) ;
        if(userData){ 
            let json={ id : userData.id, role : userData.roleId, username : userData.user_name }; 
            let token=  jwt.sign({json}, privateKey, { algorithm: 'HS256',expiresIn:'1d'}); 
            userData.password="";      
            var result = {status:true,msg:'Authenticated successfully!',value:{user:userData,token:token}}
            return res.status(200).json(result);
        }
        else
        return  res.status(200).json({status:false,msg:'Failed Authenticate, no such user found!',value:null});
    }catch(err){
        console.error(err);
         
    }
}); 
 
module.exports = router;
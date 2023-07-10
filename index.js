const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken'); 
const cors = require('cors'); 
const path = require("path");
const fs = require('fs');

global.jwt=jwt;  

const app = express();

dotenv.config(); 
const privateKey=process.env.PRIVATE_KEY; 
app.use('/public', express.static('public')); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); 
 
app.options('*', cors());

const db = require("./model");
db.sequelize.sync();

var {authorize} = require('./security/auth');

const userRoute = require('./routes/user-route');  
const countryRoute = require('./routes/country-route');  
const provinceRoute = require('./routes/province-route');  
const categoryRoute = require('./routes/category-route'); 
const subCategoryRoute = require('./routes/sub-category-route'); 
const productRoute = require('./routes/product-route'); 
const companyRoute = require('./routes/company-route'); 
const shopRoute = require('./routes/shop-route'); 
const locationRoute = require('./routes/loc-route-route'); 
const orderRoute = require('./routes/order-route'); 
const vanRoute = require('./routes/van-route'); 
const vanStockRoute = require('./routes/vanstock-route'); 
const returnRote = require('./routes/purchase-return-route'); 
const complaintTypeRoute = require('./routes/complaint-type-route'); 
const complaintRoute = require('./routes/complaint-route'); 
const attendanceRoute = require('./routes/attendance-route'); 
const generalRoute = require('./routes/general-route'); 
const departmentRoute = require('./routes/department-route'); 
const designationRoute = require('./routes/designation-route'); 
const billTypeRoute = require('./routes/bill-type-route');
const routeInfoRoute = require('./routes/route-info-route');  
const stockRequestRoute = require('./routes/van-stock-request-route');  

app.use('/api/v1/user', userRoute);  
app.use('/api/v1/country', countryRoute); 
app.use('/api/v1/province', provinceRoute); 
app.use('/api/v1/category', categoryRoute); 
app.use('/api/v1/subcategory', subCategoryRoute); 
app.use('/api/v1/product', productRoute); 
app.use('/api/v1/route', locationRoute); 
app.use('/api/v1/company', companyRoute); 
app.use('/api/v1/shop', shopRoute); 
app.use('/api/v1/order', orderRoute); 
app.use('/api/v1/van', vanRoute); 
app.use('/api/v1/van-stock', vanStockRoute); 
app.use('/api/v1/purchase-return', returnRote); 
app.use('/api/v1/complaint-type', complaintTypeRoute); 
app.use('/api/v1/complaint', complaintRoute); 
app.use('/api/v1/attendance', attendanceRoute); 
app.use('/api/v1/general', generalRoute); 
app.use('/api/v1/department', departmentRoute); 
app.use('/api/v1/designation', designationRoute); 
app.use('/api/v1/billtype', billTypeRoute); 
app.use('/api/v1/route-info', routeInfoRoute); 
app.use('/api/v1/stock-request', stockRequestRoute); 

const PORT=process.env.PORT||3000; 

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));

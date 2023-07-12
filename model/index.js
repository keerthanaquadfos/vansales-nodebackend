const dbConfig = require("../config/config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false, 
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.UserRole  = require("./user-role")(sequelize, Sequelize);
db.UserAccount = require("./user-account")(sequelize, Sequelize);
db.Category  = require("./category")(sequelize, Sequelize);
db.SubCategory  = require("./subcategory")(sequelize, Sequelize);
db.Product  = require("./product")(sequelize, Sequelize);
db.Attendance  = require("./attendance")(sequelize, Sequelize);
db.ComplaintType  = require("./complaint-type")(sequelize, Sequelize);
db.Complaint   = require("./complaint")(sequelize, Sequelize);
db.Order   = require("./order")(sequelize, Sequelize);
db.OrderDetail  = require("./order-detail")(sequelize, Sequelize);
db.PurchaseReturn  = require("./purchase-return")(sequelize, Sequelize);
db.ReturnItem  = require("./return-item")(sequelize, Sequelize);
db.Route  = require("./route")(sequelize, Sequelize);
db.Shop  = require("./shop")(sequelize, Sequelize);
db.Van  = require("./van")(sequelize, Sequelize);
db.VanStock  = require("./van-stock")(sequelize, Sequelize);
db.Country  = require("./country")(sequelize, Sequelize);
db.Province  = require("./province")(sequelize, Sequelize);
db.Department  = require("./department")(sequelize, Sequelize);
db.Designation  = require("./designation")(sequelize, Sequelize);
db.BillType  = require("./bill-type")(sequelize, Sequelize);
db.Company  = require("./company")(sequelize, Sequelize);
db.VanUserRoute = require('./van-user-route')(sequelize,Sequelize);
db.VanStockRequest = require('./van-stock-request')(sequelize,Sequelize);
db.VanStockItem = require('./van-stock-item')(sequelize,Sequelize);
db.Payment =  require('./payment')(sequelize,Sequelize);
module.exports = db;
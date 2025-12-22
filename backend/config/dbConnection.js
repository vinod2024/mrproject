const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     // database name
  process.env.DB_USER,   // mysql username
  process.env.DB_PASSWORD,  // mysql password
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    // logging: false, // disable SQL logs
    /* pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    } */
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected using Sequelize");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();

module.exports = sequelize;


// mysql connection.
/* const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
    
  console.log('database connected.');

});

module.exports = db; */
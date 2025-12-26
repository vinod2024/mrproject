const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");

const Posts = sequelize.define("Posts", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.TEXT,
  },
  
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
  created_by: {
    type: DataTypes.INTEGER,
    defaultValue:0
  },
  updated_by: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  
}, {
  timestamps:false
}
);

// table create or alter.
/* sequelize.sync({ alter: true })
  .then(() => console.log("Tables synced"))
  .catch(err => console.error(err)); */

module.exports = Posts;

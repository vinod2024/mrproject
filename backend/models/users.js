const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");

const User = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rest_password: {
    type: DataTypes.ENUM('0','1'),
    allowNull: false,
    defaultValue: '0'
  },
  contact_no: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:1111111
  },
  profile_image: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
  },
  is_varified: {
    type: DataTypes.ENUM('0','1'),
    defaultValue: '0'
  },
  token: {
    type: DataTypes.TEXT,
  },
  is_active: {
    type: DataTypes.SMALLINT,
    defaultValue:0
  },
  last_login_at: {
    type: DataTypes.DATE,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
  updated_by: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  
}, {
  timestamps:false
}
);

module.exports = User;

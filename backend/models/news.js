const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");

const News = sequelize.define("News", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
  article_id: {
    type: DataTypes.STRING,
     unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  description: {
    type: DataTypes.TEXT,
  },
  pubDate: {
    type: DataTypes.DATE,
  },
  image_url: {
    type: DataTypes.TEXT,
  }, 
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
  
}, {
  timestamps:false
}
);

module.exports = News;

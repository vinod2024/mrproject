const express = require('express');
const axios = require('axios');
const sequelize = require("../config/dbConnection"); // sequelize
const News = require("../models/news.js");

const newsData = async () =>{
// async function newsData() {
  try{
    const response = await axios.get(
    'https://newsdata.io/api/1/latest',
      {
        params: {
          // country: 'in',
          q:'india',
          apikey: process.env.NEWS_API_KEY
        }
      }
    );

    // console.log("response: ", response.data.results);
    const newsApiData = response.data.results;
    /* if(newsApiData.isEmpty()){
      console.log("Data not found!");
    } */

    for (const article of newsApiData) {
      let newsData = {
        "article_id": article.article_id,
        "title": article.title,
        "description": article.description,
        "pubDate": article.pubDate,
        "image_url": article.image_url,
      }
      const news = await News.create(newsData, {
        ignoreDuplicates: true
      });
      /* console.log("in loop");
      return false; */
    }  

    
  } catch(error){
    console.log("Error: ", error.message);
  }
  console.log("News added successfylly.");

  // insert into news table.
  


}

module.exports = {
  newsData
};
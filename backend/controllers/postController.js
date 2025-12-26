const express = require('express');
const { validationResult } = require('express-validator');

const sequelize = require("../config/dbConnection"); // sequelize
const Post = require("../models/posts.js");
const { where } = require('sequelize');

// add post
const addPost = async(req, res) => {
  console.log("Request Body:", req.body);
  const errors = validationResult(req);

  if(!errors.isEmpty() ){
    return res.status(400).json({errors:errors.array()});
  }

  try {
    const post = await Post.create(req.body);
    res.status(201).json({ success: true, data: post, msg: "Post added successfylly." });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }

}


// READ ALL
/* const getPostList = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json({ success: true, data: posts, msg: 'list data successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
}; */

const getPostList = async (req, res) => {
  try {
    // 1️⃣ Get query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    // 2️⃣ Sequelize pagination
    const { rows, count } = await Post.findAndCountAll({
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });

    // 3️⃣ Calculate total pages
    const totalPages = Math.ceil(count / limit);

    // 4️⃣ Send response
    return res.status(200).json({ success: true, data: rows, msg: 'list data successfully.', 
      page,
      totalPages,
      total: count,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: error.message });
  }
};


// deletePost
const deletePost = async (req, res) => {
  try{
    const postData = await Post.findByPk(req.params.id);
    if(!postData) res.status(400).json({ success: false, msg: 'Record not found'});
    const postDelete = await postData.destroy();
    if(!postDelete) res.status(400).json({ success: false, data: postDelete, msg: 'Record not found'});
    res.status(200).json({ success: true, data: postDelete, msg: "Successfylly deleted."});
  } catch(error){
    res.status(500).json({ success: false, msg: error.message});
  }
}

// get post.
const getPost = async (req, res) => {
  try {
    const posts = await Post.findByPk(req.params.id);
    res.status(200).json({ success: true, data: posts, msg: 'Get data successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// update post.
const updatePost = async(req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty() ){
    return res.status(400).json({errors:errors.array()});
  }

  try {
    const post = await Post.update(req.body, {where:{"id": req.params.id}});
    res.status(200).json({ success: true, data: post, msg: "Post updated successfully." });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
}

module.exports = {
  addPost,
  getPostList,
  deletePost,
  getPost,
  updatePost
}
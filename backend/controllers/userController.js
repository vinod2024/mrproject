const express = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// const db = require('../config/dbConnection');
const sequelize = require("../config/dbConnection"); // sequelize
const user = require("../models/users.js");
/* sequelize.sync({ alter: true })
  .then(() => console.log("Tables synced"))
  .catch(err => console.error(err)); */

const randomstring = require('randomstring');
const sendMail = require('../helpers/sendMail');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const register = async(req, res) => {
  // console.log("Request Body:", req.body);
  const errors = validationResult(req);

  if(!errors.isEmpty() ){
    return res.status(400).json({errors:errors.array()});
  }

  const userData = await user.findAll({
    where: { email: req.body.email }
  });

  console.log("user: ", userData);
  if(userData.length){
    return res.status(409).send({
      msg: 'this email is already used.',
    });
  }else{
    bcrypt.hash(req.body.password, 10, async(error, hash) => {
        if(error){
          return res.status(400).send({
            msg: error
          });
        }
        else{

          try {
            const userDataVal = {"name":req.body.name, "email":req.body.email, "password":hash};
            const userInsertData = await user.create(userDataVal);
            if (!userInsertData) return res.status(400).json({ msg: "User not created." });
            
            // send mail.
            let mailSbuject = 'Mail Varification';
            const randomToken = randomstring.generate();
            const frontEndUrl = process.env.FRONTEND_URL + "mail-varification/"+randomToken;
            let content = `<p>
                            Hi ${req.body.name},<br>
                            Please <a href="${frontEndUrl}">Verify your mail</a>.
                          </p>`;
            sendMail(req.body.email, mailSbuject, content);
            
            // update. , {"email":req.body.email}
            const updateToken = await userInsertData.update({"token":randomToken});
            if(!updateToken) return res.status(500).json({ msg: "User token not created." });

            return res.status(201).json({ success: true, data: userInsertData, msg: "User has been register" });

          } catch (error) {
            return res.status(400).json({ success: false, msg: error.message });
          }                
              
          
        }
      });
  }
 
}

const varifyMail = async(req, res) => {

    var token = req.query.token;
    try {
        const userData = await user.findOne({
          where: { "token": token }
        });
        if (!userData) return res.status(404).json({ success: false, msg: "Token mismatch" });
        
        // update.
        const userActive = await userData.update({"token": null, "is_varified": "1", "is_active":"1"});
        console.log("userActive: ", userActive);

        if(!userActive) return res.status(400).json({success: false, msg: "User not activated" });

        return res.status(200).send({ success: true, msg: 'Mail varified successfully!' });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.msg });
    }
    
}

const login = async(req, res) => {
  // console.log(req.body);
  const errors = validationResult(req);
  console.log('errors: ', errors);
  if(!errors.isEmpty() ){
    console.log("test error");
    return res.status(400).json({errors:errors.array()});
  }

  // console.log("test error 1");

  try{
    const userData = await user.findAll({
      where: { email: req.body.email }
    });

    console.log("user: ", userData);
    // console.log("user name: ", userData[0]['email']);
    // return false
    if(!userData.length){
      return res.status(401).send({
        msg: 'Invalid credential',
      });
    }

    bcrypt.compare(
          req.body.password,
          userData[0]['password'],
          async function(bError, bResult){
              if(bError){
                return res.status(400).send({
                  msg: bError
                });
              }
    
              if(bResult){
                const token = jwt.sign({'id':userData[0]['id'], 'role':userData[0]['role']}, JWT_SECRET, { expiresIn: '1h' } );
    
                //db.query(`update users set last_login_at=now() where id = '${result[0]['id']}'`);
                /* await user.update(
                      { last_login_at: new Date() },
                      { where: { id: userData[0].id } }
                    ); */

                await user.update(
                      { last_login_at: sequelize.fn("NOW") },
                      { where: { id: userData[0].id } }
                    );

                // await userData[0].update({ last_login_at: new Date() });

                return res.status(200).send({
                  msg: 'Loggin successfully!',
                  token:token,
                  data: userData[0]
                });
    
              }
    
              return res.status(401).send({
                msg: 'Invalid credential'
              });
    
    
          }
        );

  } catch (error) {
    return res.status(400).send({
        msg: error
      });
  }  
  
  
}

const profileUpdate = async (req, res ) => {
  console.log("Body:", req.body);
  console.log("Files:", req.file);

  // check auth.
  const authToken = req.headers.authorization.split(' ')[1];
  const tokenData = jwt.verify(authToken, JWT_SECRET);

  const errors = validationResult(req);
  if(!errors.isEmpty() ){
    return res.status(400).json({errors:errors.array()});
  }

  // update user.
  try {
  // 1. Fetch only what is needed (single row)
  const userData = await user.findOne({
    attributes: ["id", "profile_image"],
    where: { id: tokenData.id }
  });

  if (!userData) {
    return res.status(404).json({ msg: "User not found" });
  }

  // 2. Decide profile image
  const profileImage = req.file?.filename || userData.profile_image;

  // 3. Instance update (no WHERE needed)
  await userData.update({
    name: req.body.name,
    age: req.body.age,
    profile_image: profileImage
  });

  return res.status(200).json({
    msg: "Updated successfully"
  });

} catch (error) {
  console.error("Update Error:", error.message);

  return res.status(500).json({
    msg: "Internal server error"
  });
}
 

}

// profileData
const profileData = async (req, res ) => {
  console.log("Body:", req.body);

  // check auth.
  const authToken = req.headers.authorization.split(' ')[1];
  const tokenData = jwt.verify(authToken, JWT_SECRET);

  // select user.
  try{
    const userData = await user.findAll({
      where: { id: tokenData.id }
    });

    if(!userData.length){
      return res.status(401).send({
        msg: 'Invalid credential',
      });
    }

    return res.status(200).send({
      success: true,
      data: userData[0],
      message: 'Fetch successfully.'
    });

  } catch (error) {
    return res.status(400).send({
        msg: error
      });
  }  
}


module.exports = {
  register,
  varifyMail,
  login,
  profileData,
  profileUpdate,
  // updateProfileForm
}
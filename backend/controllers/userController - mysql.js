const express = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// const db = require('../config/dbConnection');
const sequelize = require("./config/dbConnection"); // sequelize
const user = require("../models/users.js");
sequelize.sync({ alter: true })
  .then(() => console.log("Tables synced"))
  .catch(err => console.error(err));

const randomstring = require('randomstring');
const sendMail = require('../helpers/sendMail');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const register = (req, res) => {
  // console.log("Request Body:", req.body);
  const errors = validationResult(req);

  if(!errors.isEmpty() ){
    return res.status(400).json({errors:errors.array()});
  }

  db.query(
    `SELECT * FROM users where LOWER(email) = LOWER(${db.escape(
      req.body.email
    )})`,
    (error, result) => {
      if(result && result.length){
        return res.status(409).send({
          msg: 'this email is already used.'
        });
      }
      else {
        bcrypt.hash(req.body.password, 10, (error, hash) => {
          if(error){
            return res.status(400).send({
              msg: error
            });
          }
          else{
            db.query(
              `insert into users (name,email,password) values (
                '${req.body.name}', 
                ${db.escape(req.body.email)},
                ${db.escape(hash)}
              )`,
              (err, result) => {
                if(err){
                  return res.status(400).send({
                    msg: err
                  });
                }

                // send mail.
                let mailSbuject = 'Mail Varification';
                const randomToken = randomstring.generate();
                const frontEndUrl = process.env.FRONTEND_URL + "mail-varification/"+randomToken;
                // http://127.0.0.1:3000/mail-varification?token='+randomToken+'"
                // let content = '<p>hi '+req.body.name+',<br> Please <a href={frontEndUrl}>Verify your mail.</a></p>';
                let content = `<p>
                                Hi ${req.body.name},<br>
                                Please <a href="${frontEndUrl}">Verify your mail</a>.
                              </p>`;

                sendMail(req.body.email, mailSbuject, content);

                  db.query(`update users set token=? where email=?`, [randomToken, req.body.email], function(error, result, fields){
                  if(error){
                    return res.status(400).send({
                      msg: error
                    });
                  }

                  return res.status(201).send({
                    msg: 'User has been register'
                  });
                  
                });

                
                
              }
            );
          }
        });
      }
    }


  );

}

const varifyMail = (req, res) => {

    var token = req.query.token;
    db.query(`select * from users where token=? limit 1`, token, function(error, result, fields){

      if(error){
        // console.log(error.message);
        return res.status(400).send({
          message: error.message
        });
      }

      if(result.length > 0){
        db.query(`update users set token=null, is_varified='1' where id='${result[0].id}'`, function(error, result, fields){
          if(error){
            // console.log(error.message);
            return res.status(400).send({
              message: error.message
            });
          }
          return res.status(200).send({
            message: 'Mail varified successfully!'
          });
          // return res.render('mail-varification', {message: 'Mail varified successfully!'});
        });
        
      }else{
        // return res.render('404');
        return res.status(404).send({
          message: 'Token mismatch.'
        });

        // res.status(404).json({message:'Token mismatch.'});
      }


    });
}

const login = (req, res) => {
  const errors = validationResult(req);

  /* if(!errors.isEmpty() ){
    return res.status(400).json({errors:errors.array()});
  } */

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  db.query(`select * from users where email=?`, req.body.email, function(error, result, fields){

    if(error){
      return res.status(400).send({
        msg: error
      });
    }

    if(!result.length){
      return res.status(401).send({
        msg: 'Invalid credential'
      });
    }

    bcrypt.compare(
      req.body.password,
      result[0]['password'],
      function(bError, bResult){
          if(bError){
            return res.status(400).send({
              msg: bError
            });
          }

          if(bResult){
            const token = jwt.sign({'id':result[0]['id'], 'role':result[0]['role']}, JWT_SECRET, { expiresIn: '1h' } );

            db.query(`update users set last_login_at=now() where id = '${result[0]['id']}'`);

            return res.status(200).send({
              msg: 'Loggin successfully!',
              token:token,
              data: result[0]
            });

          }

          return res.status(401).send({
            msg: 'Invalid credential'
          });


      }
    );


  });
}

const profileUpdate = (req, res ) => {
  console.log("Body:", req.body);
  console.log("Files:", req.file);

  // check auth.
  const authToken = req.headers.authorization.split(' ')[1];
  const decode = jwt.verify(authToken, JWT_SECRET);

  const errors = validationResult(req);
  if(!errors.isEmpty() ){
    return res.status(400).json({errors:errors.array()});
  }

  // update user.
  db.query(`select profile_image from users where id=?`,decode.id, function(error, result, fields){
    if(error){
      return res.status(400).send({
        msg: error
      });
    }

    let profileImage = result[0]['profile_image'];

    if(req.file != undefined){
      profileImage = req.file.filename;
    }

    db.query(`update users set name=?, age=?, profile_image=? where id=?`, [req.body.name, req.body.age,
    profileImage, decode.id], function(error, result, fields){
      if(error){
        return res.status(400).send({
          msg: error
        });
      }

      return res.status(200).send({
        msg: 'Updated successfully.'
      });

    });

  });

  
  


  // db.query(`select * from usrs where id=?`, decode.id, function(error, result, fields){
    // if(error) throw error;

   /*  return res.status(200).send({
      success: true,
      data: result[0],
      message: 'Fetch successfully.'
    }); */
  // })

}

// profileData
const profileData = (req, res ) => {
  console.log("Body:", req.body);

  // check auth.
  const authToken = req.headers.authorization.split(' ')[1];
  const decode = jwt.verify(authToken, JWT_SECRET);

  // select user.
  db.query(`select * from users where id=?`,decode.id, function(error, result, fields){
    if(error){
      return res.status(400).send({
        msg: error
      });
    }

    return res.status(200).send({
      success: true,
      data: result[0],
      message: 'Fetch successfully.'
    });
    
  });

  

}


module.exports = {
  register,
  varifyMail,
  login,
  profileData,
  profileUpdate,
  // updateProfileForm
}
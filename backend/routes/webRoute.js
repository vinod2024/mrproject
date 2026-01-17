const express = require('express');
const passport = require("passport");
const googleOAuth = require("../middleware/google-oauth");


const user_route = express();

user_route.set('view engine', 'ejs');
user_route.set('views', './views');
user_route.use(express.static('public'));

const userController = require('../controllers/userController');

user_route.get('/mail-varification', userController.varifyMail);
user_route.get('/', userController.googleLogin); // google auth

// Start Google login
user_route.get("/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// Google callback
/* user_route.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5174/login",
    successRedirect: "http://localhost:5174/movies",
  })
); */
user_route.get('/auth/google/callback', userController.googleCallBack);


user_route.get('/profile', userController.profile);
user_route.get('/google-logout', userController.googleLogout);


// user_route.get('/profile-update', userController.updateProfileForm);

module.exports = user_route;
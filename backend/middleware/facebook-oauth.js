const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();

const sequelize = require("../config/dbConnection"); // sequelize
const user = require("../models/users.js");

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'photos', 'emails']
  },
  async (accessToken, refreshToken, profile, done) => {
    // console.log('profile: ', profile);

    try {
      let userData = await user.findAll({
        where: { auth_id: profile.id }
      });

      if (userData.length === 0) {
        const myData = {
          provider: "facebook",
          auth_id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          password: profile.id,
          profile_image: profile.photos[0].value,
          is_active: 1,
          is_varified: '1'          
        }
        // console.log('myData111: ', myData);
        var userInsert = await user.create(myData);
        // console.log('userInsert:', userInsert);

        userData = await user.findAll({
          where: { auth_id: profile.id }
        });
      }
      // console.log("userData: ", userData);

      return done(null, userData);
    } catch (err) {
      console.log("Error: ", err);
      return done(err, null);
    }
  }
));
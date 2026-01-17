const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const sequelize = require("../config/dbConnection"); // sequelize
const user = require("../models/users.js");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let userData = await user.findAll({
        where: { auth_id: profile.id }
      });

      if (userData.length === 0) {
        const myData = {
          provider: "google",
          auth_id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          password: profile.id,
          profile_image: profile.photos[0].value,
          is_active: 1,
          is_varified: '1'          
        }
        await user.create(myData);

        userData = await user.findAll({
          where: { auth_id: profile.id }
        });
      }

      
      console.log("userData: ", userData);

      return done(null, userData);
    } catch (err) {
      return done(err, null);
    }
  }
));

/* passport.serializeUser((user, done) => {
  // console.log("Serializing user:", user);
  done(null, user);
}); */

/* passport.deserializeUser((user, done) => {
  // User.findById(id).then((user) => {
    // console.log("Deserializing user:", user);
    done(null, user);
  // }).catch((err) => done(err, null)); 

}); */
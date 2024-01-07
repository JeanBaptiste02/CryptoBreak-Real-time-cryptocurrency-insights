const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const GoogleUserModel = require("../models/user");
const express = require("express");
const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "211522276146-afjeqr7asq8nn39evgj7po90u64dhmue.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        let user = await GoogleUserModel.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        } else {
          user = new GoogleUserModel({
            googleId: profile.id,
            email: profile.email,
          });

          await user.save();

          return done(null, user);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

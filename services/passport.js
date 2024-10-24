const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys')
const User = mongoose.model('users');

passport.serializeUser(((user, done) => { // turning user into an id and stuffing it in cookie
    done(null, user.id);
}));

passport.deserializeUser((id, done) => { //turning an user id in to a mongoose model instance
    User.findById(id)
    .then(user => {
        done(null, user);
    })
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: 'https://emaily-survey.onrender.com/'
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(accessToken)
    console.log(refreshToken)
    console.log(profile)
    User.findOne({googleID: profile.id}).then((existingUser) => {
        if(existingUser) {
            done(null, existingUser);
        } else {
            new User({ googleID: profile.id }).save().then(user => done(null, user));
        }
    });
}));
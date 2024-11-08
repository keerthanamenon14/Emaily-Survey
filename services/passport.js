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
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({googleID: profile.id});
    if(existingUser) {
        return done(null, existingUser);
    } 
    const user = await new User({ googleID: profile.id }).save();
    done(null, user);
}));
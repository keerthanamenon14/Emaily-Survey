const passport = require('passport');

module.exports = (app) => {
app.get('/auth/google', passport.authenticate('google',{
    scope: ['profile', 'email']
}));
  
app.get('/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/surveys');
    } 
); //although the /auth/google route performs the same here it gets the code in call back and server recognizes that the user is not making the request for the first time

app.get('/api/current_user', (req, res) => {
    res.send(req.user);
});

app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

};
// user logs intp auth/google , 
// then it takes him to google authentication , choosing his account it verifies and return a call back with code


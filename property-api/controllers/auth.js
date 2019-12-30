const LocalStrategy = require('passport-local');
const authHandler = (req, res,passport) => {    
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('incorrect details')
    }

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
  }, (email, password, done) => {
    Users.findOne({ email })
      .then((user) => {
        if(!user || !user.validatePassword(password)) {
          return done(null, false, { errors: { 'email or password': 'is invalid' } });
        }
  
        return done(null, user);
      }).catch(done);
  }));
}
module.exports = {
    authHandler: authHandler
}
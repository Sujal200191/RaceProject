const passport = require('passport');
const LocalStrategy = require('./localStrategy');

//  Use Strategies 
passport.use(LocalStrategy);

const authLocal = passport.authenticate('local', { session: false });

module.exports = authLocal;
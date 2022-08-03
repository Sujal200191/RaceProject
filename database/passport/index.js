import passport from 'passport';
import { LocalStrategy } from './LocalStrategy';

passport.use(LocalStrategy);

const authLocal = passport.authenticate('local', { session : false });

module.exports = authLocal;
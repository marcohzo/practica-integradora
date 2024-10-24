import 'dotenv/config.js';
import passport from 'passport';
import jwt from 'passport-jwt';
import cookieExtractor from './cookieExtractor.js';

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const secret = process.env.SECRET_KEY;

const initializePassport = () => {
  passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: secret,
  }, async (jwt_payload, done) => {
    try {
        return done(null, jwt_payload);
    }
    catch (error) {
        return done(error);
    }
  }))
};

export default initializePassport;

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../model/User");
const key = require("../config/keys").secret;

const options = {};
// extract token from the header
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = key;

const addPassportStrategy = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwtPayload, done) => {
      User.findById(jwtPayload._id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
};

module.exports = { addPassportStrategy };

const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const User = require("../database/models/user");

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  // console.log("Passport serializeUser called, user: ");
  //   console.log(user); // the whole raw user object!
  //   console.log("---------");
  done(null, { _id: user._id });
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
  // console.log(
  //   "Passport DeserializeUser called, passing back user info, if any"
  // );
  User.find(
    { _id: id },
    "_id firstName lastName email profile github portfolio angular css html java javascript nodejs python reactjs role",
    (err, user) => {
      console.log(user);
      done(null, user);
    }
  );
});

//  Use Strategies
passport.use(LocalStrategy);

module.exports = passport;

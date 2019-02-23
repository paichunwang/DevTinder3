const express = require("express");
const app = express.Router();
// const path = require("path");
const User = require("../server/database/models/user");
const passport = require("passport");
const LocalStrategy = require("../server/passport/localStrategy");
passport.use(LocalStrategy);

//check existing user base on cookie, when user return
app.get("/user/", (req, res, next) => {
  console.log("===== user!!======");
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

//new user signup
app.post("/user/", (req, res) => {
  console.log("user signup routes.js");
  const { firstname, lastname, email, password } = req.body;

  // // ADD VALIDATION
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log("user signup post error: ", err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the email: ${email}`
      });
    } else {
      const newUser = new User({
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});

//authenticate user and log cookie
app.post("/user/login", passport.authenticate("local"), (req, res) => {
  console.log("logged in", req.user);
  let userInfo = {
    fName: req.user.firstName,
    lName: req.user.lastName,
    email: req.user.email
  };
  res.send(userInfo);
});

// catch all non-existing routes and serve the react static files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

module.exports = app;

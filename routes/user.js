const express = require("express");
const app = express.Router();
// const path = require("path");
const User = require("../server/database/models/user");
const passport = require("passport");
const LocalStrategy = require("../server/passport/localStrategy");
passport.use(LocalStrategy);

app.post("/user/", (req, res) => {
  console.log("user signup routes.js");
  const { firstname, lastname, email, password } = req.body;

  // // ADD VALIDATION
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log("user signup post error: ", err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${email}`
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

app.get("/testget", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("did not find user", err);
    } else {
      console.log("found user");
    }
  });
});

app.post("/user/login", passport.authenticate("local"), (req, res) => {
  console.log("logged in", req.user);
  var userInfo = {
    username: req.user.username
  };
  res.send(userInfo);
});

//catch all non-existing routes and serve the react static files
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/../client/build/index.html"));
// });

module.exports = app;

const express = require("express");
const app = express.Router();
const path = require("path");
const User = require("../server/database/models/user");
const passport = require("passport");
const LocalStrategy = require("../server/passport/localStrategy");
passport.use(LocalStrategy);

//user passport deserializer to get information, if user exists, send user information back to front
app.get("/user/", (req, res, next) => {
  console.log("GET /user/ routes: ", req.user);
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
  // console.log("logged in", req.user);

  const {
    _id,
    firstName,
    lastName,
    email,
    github,
    profile,
    protfolio
  } = req.user;
  let userInfo = {
    id: _id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    github: github,
    profile: profile,
    protfolio: protfolio
  };
  console.log("info sent back to front end", userInfo);
  res.send(userInfo);
});

//user account update method
app.post("/update/user", (req, res) => {
  const { id } = req.body;
  console.log(req.body);

  User.updateOne({ _id: id }, { $set: req.body }, (err, user) => {
    if (err) {
      console.log("account settings : user id lookup error", err);
    } else {
      res.json(user);
    }
  });
});

//user account re-render method
app.get("/update/user/render", (req, res) => {
  User.findById(req.query.id, (err, user) => {
    if (err) {
      console.log("Did not find user to update", err);
    } else {
      res.json(user);
    }
  });
  console.log("hitting user render update id", req.query.id);
});

// catch all non-existing routes and serve the react static files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

module.exports = app;

const express = require("express");
const app = express.Router();
const path = require("path");
const User = require("../server/database/models/user");
// const passport = require("../passport");

// use this to check if db and localhost was connecting
//const generatePassword = require("password-generator");
// app.get("/api/passwords", (req, res) => {
//   const count = 5;

//   // Generate some passwords
//   const passwords = Array.from(Array(count).keys()).map(i =>
//     generatePassword(12, false)
//   );

//   // Return them as json
//   res.json(passwords);

//   console.log(`Sent ${count} passwords`);
// });

app.post("/user/", (req, res) => {
  console.log("user signup routes.js");
  const { firstname, lastname, email, password } = req.body;
  // console.log(firstname, lastname, email, password);
  // const { fname, lname, email, password } = req.body;
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

//catch all non-existing routes and serve the react static files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

module.exports = app;

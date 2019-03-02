const express = require("express");
const app = express.Router();
const path = require("path");
const User = require("../server/database/models/user");
const Project = require("../server/database/models/project");
const passport = require("passport");
const LocalStrategy = require("../server/passport/localStrategy");
passport.use(LocalStrategy);

//user passport deserializer to get information, if user exists, send user information back to front
app.get("/user/", (req, res, next) => {
  //console.log("GET /user/ routes: ", req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

//new user signup
app.post("/user/", (req, res) => {
  //console.log("user signup routes.js");
  const { firstname, lastname, email, password } = req.body;

  // // ADD VALIDATION
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      //console.log("user signup post error: ", err);
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
    portfolio
  } = req.user;
  let userInfo = {
    id: _id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    github: github,
    profile: profile,
    portfolio: portfolio
  };
  //console.log("info sent back to front end", userInfo);
  res.send(userInfo);
});

//user account update method
app.post("/update/user", (req, res) => {
  const { id } = req.body;
  //console.log(req.body);

  User.updateOne({ _id: id }, { $set: req.body }, (err, user) => {
    if (err) {
      //console.log("account settings : user id lookup error", err);
    } else {
      res.json(user);
    }
  });
});

// using the project schema to add a new project
app.post("/user/addProject", (req, res) => {
  const {
    ownerID,
    projectName,
    projectDescription,
    projectSkillReq,
    projectBudget,
    projectDue,
    projectInit
  } = req.body;

  console.log("add project", req.body);

  // Create an instance of model SomeModel
  const newProject = new Project({
    ownerID: ownerID,
    projectName: projectName,
    projectDescription: projectDescription,
    projectSkillReq: projectSkillReq,
    projectBudget: projectBudget,
    projectDue: projectDue,
    projectInit: projectInit
  });

  // Save the new model instance, passing a callback
  newProject.save((err, savedProject) => {
    console.log("saveproject", savedProject);
    if (err) return res.json(err);
    res.json(savedProject);
  });
});

//calls db with id passed from component to get all open and completed projects
app.post("/user/callProject", (req, res) => {
  // console.log("req body", req.body);
  let name = req.body.searchField;
  let value = req.body.searchID;
  // console.log(typeof value, value);
  // let query = {};
  // query[name] = value;
  // console.log(query);
  Project.find({ [name]: value }, function(err, project) {
    if (err) {
      console.log("Project find one error: ", err);
    } else {
      // console.log(project);
      res.send(project);
    }
  });
});

app.post("/user/completeProject", (req, res) => {
  const { id } = req.body;
  Project.updateOne({ _id: id }, { $set: req.body }, (err, user) => {
    if (err) {
      console.log("Complete Project error", err);
    } else {
      res.json(user);
    }
  });
});

//user account re-render method
// app.get("/update/user/render", (req, res) => {
//   User.findById(req.query.id, (err, user) => {
//     if (err) {
//       //console.log("Did not find user to update", err);
//     } else {
//       res.json(user);
//     }
//   });
//   //console.log("hitting user render update id", req.query.id);
// });

// catch all non-existing routes and serve the react static files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

module.exports = app;

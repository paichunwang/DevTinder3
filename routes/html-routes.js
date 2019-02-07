const path = require("path");
const checkAuth = require("../check-auth.js");
const db = require("../models");

module.exports = app => {
  //for the profiles, we need to include either the user ID or some other form of identifying them
  //this will ensure that the correct information gets generated for the server side rendering
  //IE correct picture, projects etc.

  //Im pretty sure we dont need any of these routes anymore now that we are reactifiying. Will leave these here for now 
  //can discuss later
  app.get("/", (req, res) => {
    console.log("Index Main Page");
    res.render("index");
  });

  app.get("/customerlogin", (req, res) => {
    console.log("Customer Main Page");
    res.render("partials/Customer/customerlogin");
  });

  app.get("/developerlogin", (req, res) => {
    console.log("Developer Main Page");
    res.render("partials/Developer/developerlogin");
  });

  app.get("/newdeveloper", (req, res) => {
    console.log("Developer Signup");
    res.render("partials/Developer/developerSignup");
  });

  app.get("/newcustomer", (req, res) => {
    console.log("Customer Signup");
    res.render("partials/Customer/customerSignup");
  });

  app.get("/newproject", checkAuth, (req, res) => {
    console.log("Create a Project Section");
    res.render("partials/Customer/CustomerControlMenu/addproject");
  });

 
};

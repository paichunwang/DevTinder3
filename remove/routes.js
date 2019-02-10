const express = require("express");
const app = express();
const generatePassword = require("password-generator");
const path = require("path");

app.get("/api/passwords", (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  );

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

//catch all non-existing routes and serve the react static files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

module.exports = app;

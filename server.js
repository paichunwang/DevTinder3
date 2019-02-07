const express = require("express");

const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");

const routes = require("./routes/api/index");
const app = express();
const PORT = process.env.PORT || 3001;

// const db = require("./models");

// Define middleware here
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cookieParser());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

//start the api server and sequelized the connection
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

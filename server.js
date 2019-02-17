const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

const router = require("./routes/user");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//serving static folder and routes folder
app.use(express.static(path.join(__dirname, "client/build")));

//use body parser and urlencoded to parse data, otherwise cant use it.
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
//use routes defined in routes/routes folder.
app.use(router);

//detect if heroku or localhost, and serve the proper static files. Localhost is served in routes folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(
    () => {
      console.log("Database is connected");
    },
    err => {
      console.log("Can not connect to the database" + err);
    }
  )
  .catch(err => {
    console.log("Error on start: " + err.stack);
    process.exit(1);
  });

app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`);
});

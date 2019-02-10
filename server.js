const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

const router = require("./routes/routes");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
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

//serving static folder and routes folder
app.use(express.static(path.join(__dirname, "client/build")));

//use routes defined in routes/routes folder.
app.use(router);

//detect if heroku or localhost, and serve the proper static files. Localhost is served in routes folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`);
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
// const cors = require("cors");

const router = require("./routes/routes");

require("dotenv").config();

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(
//     () => {
//       console.log("Database is connected");
//     },
//     err => {
//       console.log("Can not connect to the database" + err);
//     }
//   )
//   .catch(err => {
//     console.log("Error on start: " + err.stack);
//     process.exit(1);
//   });

//this uses custom router in routes/routes.js
app.use(router);

//catch all non-existing routes and serve the react static files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

//body parser for decoding https request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log("Server is running on Port: ", PORT);
});

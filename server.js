const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

//dotenv for development connection to mongodb with heroku
require("dotenv").config();

//declare heroku port or local port
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "client", "build")));

var db;

MongoClient.connect(
  process.env.mongoDB_uri,
  { useNewUrlParser: true },
  (err, client) => {
    if (err) return console.log(err);
    db = client.db(process.env.mongoDB_db);

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });

    app.listen(PORT, () => {
      console.log(`mongoDB server on port: ${PORT}!`);
    });

    db.collection("user")
      .find()
      .toArray(function(err, results) {
        console.log("Testing MongoDB query result: ", results);
        // send HTML file populated with quotes here
      });
  }
);

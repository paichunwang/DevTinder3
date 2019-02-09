const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

//dotenv for development connection to mongodb with heroku
require("dotenv").config();

//declare heroku port or local port
const PORT = process.env.PORT || 3001;

//set express static folder as client
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

var db;

MongoClient.connect(
  process.env.mongoDB_uri,
  { useNewUrlParser: true },
  (err, client) => {
    if (err) return console.log(err);
    db = client.db(process.env.mongoDB_db);

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

const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

require("dotenv").config();

const PORT = process.env.PORT || 3001;

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

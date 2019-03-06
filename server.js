const express = require("express");
const path = require("path");

// const http = require("http");

const app = express();
const port = process.env.PORT || 5000;

const router = require("./routes/user");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const passport = require("./server/passport");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

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

//detect if heroku or localhost, and serve the proper static files. Localhost is served in routes folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

//serving static folder and routes folder
app.use(express.static(path.join(__dirname, "client/build")));

//use body parser and urlencoded to parse data, otherwise cant use it.
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//express-session for logging cookie
app.use(
  session({
    secret: "fraggle-rock", //pick a random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false, //required
    saveUninitialized: false, //required
    maxAge: 1000 * 60 * 24 * 7
  })
);
// Passport for middleware, placed near the bottom since high ups will create multiple calls
//https://github.com/jaredhanson/passport/issues/14#issuecomment-4863459
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

//use routes defined in routes/routes folder.
app.use(router);

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
  console.log(`App server listening on port: ${port}`);
});

// const server = http.createServer(app);
// const io = require("socket.io").listen(server); //pass a http.Server instance
// server.listen(80, (req, res) => {
//   console.log(`socket io server listening`);
// }); //listen on port 80

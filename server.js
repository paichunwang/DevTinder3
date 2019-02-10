const express = require("express");
const path = require("path");
const generatePassword = require("password-generator");
const app = express();
const port = process.env.PORT || 5000;

const router = require("./routes/routes");

app.use(express.static(path.join(__dirname, "client/build")));
app.use(router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  //
  app.get("*", (req, res) => {
    res.sendfile(path.join((__dirname = "client/build/index.html")));
  });
}

app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`);
});

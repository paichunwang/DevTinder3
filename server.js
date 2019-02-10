const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

const router = require("./routes/routes");

//serving static folder and routes folder
app.use(express.static(path.join(__dirname, "client/build")));
app.use(router);

//detect if heroku or localhost, and serve the proper static files. Localhost is served in routes folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`);
});

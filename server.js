const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');
const routes = require("./routes");
const mongoose = require("mongoose");

//Rekognition *************************************************************************************************************************
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/build')));
app.use(routes);



//****************************************************************************************************************************************
// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/persona"
);


// Serve up static assets (usually on heroku)
// var options = {
//   index: false
// } // unsuccessful deploy fix attempt based on https://github.com/react-boilerplate/react-boilerplate/issues/1676 and https://expressjs.com/en/4x/api.html#express.static

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  // app.use(express.static("client/build", options)); // unsuccessful deploy fix attempt based on https://github.com/react-boilerplate/react-boilerplate/issues/1676 and https://expressjs.com/en/4x/api.html#express.static
}

// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// }); // deploy fix (removed) per Week 20 homework solution

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

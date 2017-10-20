var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var session = require('express-session');
var passport = require('passport');

var Recipe = require("./models/Recipe.js");
var User = require("./models/User.js");

mongoose.connect('mongodb://heroku_vz9nrjcj:ham34eub16kmh9243us1m3n07s@ds125555.mlab.com:25555/heroku_vz9nrjcj', {
  useMongoClient: true
});
mongoose.Promise = global.Promise;


var app = express();

// Configure app with morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// Static file support with public folder
app.use(express.static("public"));

app.use(session({
	secret: 'sdkfhjksdhfjdsfj',
	resave: false,
	saveUinitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
require('./passportconfig').configure(passport);

app.use(require('./routes/general'));

app.use(require('./routes/auth'));
 
var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log("App running on port 8000!");
});

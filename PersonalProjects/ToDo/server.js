//setup
var express = require('express');
var app = express();					//create app with express

var mongoose = require('mongoose');		//mongoose for mongodb
var morgan = require('morgan');			//logs requests to console (express 4)
var bodyParser = require('bodyParser');	//pull information from HTML POST (express 4)
var methodOverride = require('methodOverride');	//simulate DELETE and PUT (express 4)

//configuration
mongoose.connect('mongodb://localhost/')

app.use(express.static(__dirname + '/public'));					//set the static files location /public/img will be /img for users
app.use(morgan('dev'));											//log every request to console
app.use(bodyParser.urlencoded({ 'extended' : 'true'}));			//parse application/x-www-form-urlencoded
app.use(bodyParser.json());										//parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));	//parse application/vnd.api+json

//listen
app.listen(8080);
console.log("App listening on port 8080");


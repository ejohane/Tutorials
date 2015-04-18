//setup
var express = require('express');
var app = express();					//create app with express

var mongoose = require('mongoose');		//mongoose for mongodb
var morgan = require('morgan');			//logs requests to console (express 4)
var bodyParser = require('body-parser');	//pull information from HTML POST (express 4)
var methodOverride = require('method-override');	//simulate DELETE and PUT (express 4)

//configuration
mongoose.connect('mongodb://localhost/ToDo')

app.use(express.static(__dirname + '/public'));					//set the static files location /public/img will be /img for users
app.use(morgan('dev'));											//log every request to console
app.use(bodyParser.urlencoded({ 'extended' : 'true'}));			//parse application/x-www-form-urlencoded
app.use(bodyParser.json());										//parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));	//parse application/vnd.api+json
app.use(methodOverride());

//define model 
var ToDo = mongoose.model('ToDo', {
	text : String
});

//routes ------------------------------------------

//Get all todos
app.get('/api/todos', function(req, res) {
	//use mongoose to get all todos in the db
	ToDo.find(function(err, todos){
		//if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if(err) res.send(err);

		res.json(todos);	//return all todos in JSON format
	});
});

app.post('api/todos', function(err, res){
	
	ToDo.create({
		text : req.body.text,
		done : false
	}, function(err, todo){
		if(err) res.send(err);

		ToDo.find(function(err, todos){
			if(err) res.send(err);

			res.json(todos);
		});
	});
});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
    ToDo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err) res.send(err);

        // get and return all the todos after you create another
        ToDo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});



//fronted routes
app.get('*', function(err, res){
res.sendfile('./public/index.html');
});

//listen
app.listen(8080);
console.log("App listening on port 8080");


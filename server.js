// Set up.
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var database = require('./config/database');
var repositoryFactory = require('./app/repositories/repositoryFactory');

// Configuration.
mongoose.connect(database.url);

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 						// simulate DELETE and PUT
});

// Load the routes.
require('./app/routes')(app, repositoryFactory.create('todo'));

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");


/**
	* Node.js Login Boilerplate
	* More Info : http://kitchen.braitsch.io/building-a-login-system-in-node-js-and-mongodb/
	* Copyright (c) 2013-2016 Stephen Braitsch
**/

var http = require('http');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);

var app = express();

app.locals.pretty = true;
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'jade');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
app.use(express.static(__dirname + '/app/public'));

// build mongo database connection url //

var dbENV = process.env.DB_ENV || 'localhost';
var dbPort = process.env.DB_PORT || 27017;
var dbName = process.env.DB_NAME || 'touchberrykey';

if (process.env.DB_ENV == 'mongodb.atlas') {
	var dbHost = process.env.DB_HOST || 'cluster0-shard-00-01-smsp4.mongodb.net'
	var dbUser = process.env.DB_USER || 'touchberry'
	var dbPass = process.env.DB_PASS || 'touchberry!'
	var dbURL = 'mongodb://'+ dbUser +':'+dbPass+'@'+ dbHost +':'+ dbPort + '/' + dbName + '?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

}
else {
	var dbHost = process.env.DB_HOST || 'localhost'
	var dbURL = 'mongodb://'+dbHost+':'+dbPort+'/'+dbName;
}

console.log(dbURL);

app.use(session({
	secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
	proxy: true,
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({ url: dbURL })
	})
);

require('./app/server/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

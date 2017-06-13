var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);

var app = express();
app.locals.pretty = true;
app.set('http_port', process.env.HTTP_PORT || 80);
app.set('https_port', process.env.HTTPS_PORT || 443);
app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'jade');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
app.use(express.static(__dirname + '/app/public'));


function approveDomains(opts, certs, cb) {
  if (certs) {
    opts.domains = ['server.touchberrykey.ga'];
  }
  else {
    opts.email = 'sandcforge@gmail.com';
    opts.agreeTos = true;
  }
  cb(null, { options: opts, certs: certs });
}

//Get SSL required certificates
if ( process.env.NODE_ENV == 'prod' ) {
	var lex = require('greenlock-express').create({
		//server: 'staging',
		server: 'https://acme-v01.api.letsencrypt.org/directory',
		challenges: { 'http-01': require('le-challenge-fs').create({ webrootPath: '/tmp/acme-challenges' }) },
		store: require('le-store-certbot').create({ webrootPath: '/tmp/acme-challenges' }),
		approveDomains: approveDomains
	});
}
else {
	https_options = {
		key: fs.readFileSync('./.ssl/private.key'),
		cert: fs.readFileSync('./.ssl/certificate.pem')
	}
}


// build mongo database connection url
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
if ( process.env.NODE_ENV == 'prod') {
	require('http').createServer(lex.middleware(require('redirect-https')())).listen(80, function () {
		console.log('Express HTTP server listening on port ' + app.get('http_port'));
	});

	require('https').createServer(lex.httpsOptions, lex.middleware(app)).listen(443, function () {
		console.log('Express HTTPS server listening on port ' + app.get('https_port'));
	});
}
else {
	http.createServer(app).listen(app.get('http_port'), function(){
		console.log('Express HTTP server listening on port ' + app.get('http_port'));
	});

	https.createServer(https_options,app).listen(app.get('https_port'), function(){
		console.log('Express HTTPS server listening on port ' + app.get('https_port'));
	});

}

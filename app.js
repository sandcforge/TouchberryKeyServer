var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var envConfig = require('./config');

var app = express();
app.locals.pretty = true;
app.set('http_port', envConfig.httpPort);
app.set('https_port', envConfig.httpsPort);

if (0) {
  app.set('views', __dirname + '/app/reactviews');
  app.set('view engine', 'jsx');
  app.engine('jsx', require('express-react-views').createEngine());
}
else {
  app.set('views', __dirname + '/app/server/views');
  app.set('view engine', 'jade');
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
app.use(express.static(__dirname + '/app/public'));


function approveDomains(opts, certs, cb) {
  if (certs) {
    opts.domains = ['touchberrykey.com',
                    'www.touchberrykey.com',
                    'www.touchberrykey.ga',
                    'touchberrykey.ga'];
  }
  else {
    opts.email = 'sandcforge@gmail.com';
    opts.agreeTos = true;
  }
  cb(null, { options: opts, certs: certs });
}

//Get SSL required certificates
if ( envConfig.nodeEnv == 'prod' ) {
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


require('./app/server/routes')(app);
if ( process.env.NODE_ENV == 'prod') {
	require('http').createServer(lex.middleware(require('redirect-https')())).listen(app.get('http_port'), function () {
		console.log('Express HTTP server listening on port ' + app.get('http_port'));
	});

	require('https').createServer(lex.httpsOptions, lex.middleware(app)).listen(app.get('https_port'), function () {
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

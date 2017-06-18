var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;
var envConfig = require('./../../../config');

/*
	ESTABLISH DATABASE CONNECTION
*/


if (envConfig.dbEnv == 'mongodb.atlas') {
	var sslEnabled = true;
}
else {
	var sslEnabled = false;
}

var db = new MongoDB(envConfig.dbName, new Server(envConfig.dbHost, envConfig.dbPort, {ssl:sslEnabled, auto_reconnect: true}), {w: 1});
db.open(function(e, d){
	if (e) {
		console.log(e);
	} else {
		if (envConfig.dbEnv == 'mongodb.atlas') {
			db.admin().authenticate(envConfig.dbUser, envConfig.dbPass, function(e, res) {
				if (e) {
					console.log('mongo :: error: not authenticated', e);
				}
				else {
					console.log('mongo :: authenticated and connected to database :: "'+envConfig.dbName+'"');
				}
			});
		}	else{
			console.log('mongo :: connected to database :: "'+envConfig.dbName+'"');
		}
	}
});

exports.themes = db.collection('themes');
exports.accounts = db.collection('accounts');

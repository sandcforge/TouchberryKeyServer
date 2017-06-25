var MongoJS = require('mongojs');
var envConfig = require('./../../../config');

//console.log(envConfig.dbURL);
var db = MongoJS(envConfig.dbURL);

db.on('error', function (err) {
	console.log('database error', err)
})
db.on('connect', function () {
	console.log(`Connected to database :: ${envConfig.dbName}`);
})
exports.themes = db.collection('themes');
exports.accounts = db.collection('accounts');

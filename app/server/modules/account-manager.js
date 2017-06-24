var crypto 		= require('crypto');
var moment 		= require('moment');
var JWT = require('jsonwebtoken');
var envConfig = require('./../../../config');
var accounts = require('./db-connection').accounts;
var dbApi = require('./db-api');
/* login validation methods */

exports.autoLoginByToken = function(jwtToken, callback)
{
	JWT.verify(jwtToken,
		envConfig.tokenEncryptionKey,
		{ audience: envConfig.appName, issuer: envConfig.appName },
		function(err, loginToken) {
		if (err) {
			callback(`err code ${envConfig.errCode.invalidLoginToken}`,null,null);
		}
		else {
			let reNewJwtToken = JWT.sign({ user: loginToken.user }, envConfig.tokenEncryptionKey, { expiresIn: envConfig.defaultTokenDuration,issuer: envConfig.appName, audience: envConfig.appName  });
			callback(null, reNewJwtToken,loginToken.user);
		}
	});

}

exports.manualLogin = function(user, pass, callback)
{
	accounts.findOne({user:user}, function(e, o) {
		if (o == null){
			callback(`err code ${envConfig.errCode.userNotFound}`);
		}	else{
			validatePassword(pass, o.pass, function(err, res) {
				if (res){
					callback(null, o);
				}	else{
					callback(`err code ${envConfig.errCode.invalidPassword}`);
				}
			});
		}
	});
}

/* record insertion, update & deletion methods */

exports.addNewAccount = function(newData, callback)
{
	accounts.findOne({user:newData.user}, function(e, o) {
		if (o){
			callback(`err code ${envConfig.errCode.userTaken}`);
		}	else{
			accounts.findOne({email:newData.email}, function(e, o) {
				if (o){
					callback(`err code ${envConfig.errCode.emailTaken}`);
				}	else{
					saltAndHash(newData.pass, function(hash){
						newData.pass = hash;
					// append date stamp when record was created //
						newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
						accounts.insert(newData, {safe: true}, callback);
					});
				}
			});
		}
	});
}

exports.updateAccount = function(newData, callback)
{
	accounts.findOne({_id:dbApi.getObjectId(newData.id)}, function(e, o){
		o.name 		= newData.name;
		o.email 	= newData.email;
		o.country 	= newData.country;
		if (newData.pass == ''){
			accounts.save(o, {safe: true}, function(e) {
				if (e) callback(`err code ${envConfig.errCode.updateAccountFailure}`);
				else callback(null, o);
			});
		}	else{
			saltAndHash(newData.pass, function(hash){
				o.pass = hash;
				accounts.save(o, {safe: true}, function(e) {
					if (e) callback(`err code ${envConfig.errCode.updateAccountFailure}`);
					else callback(null, o);
				});
			});
		}
	});
}

exports.updatePassword = function(email, newPass, callback)
{
	accounts.findOne({email:email}, function(e, o){
		if (e){
			callback((`err code ${envConfig.errCode.invalidEmail}`), null);
		}	else{
			saltAndHash(newPass, function(hash){
		        o.pass = hash;
		        accounts.save(o, {safe: true}, callback);
			});
		}
	});
}

exports.getRandomPassword = function () {
	return md5(generateSalt())
}

/* account lookup methods */

exports.deleteAccount = function(id, callback)
{
	accounts.remove({_id: dbApi.getObjectId(id)}, callback);
}

exports.getAccountByEmail = function(email, callback)
{
	accounts.findOne({email:email}, function(e, o){ callback(o); });
}

exports.getAccountById = function(id, callback)
{
	accounts.findOne({_id:dbApi.getObjectId(id)}, function(e, o){ callback(o); });
}


exports.validateResetLink = function(email, passHash, callback)
{
	accounts.find({ $and: [{email:email, pass:passHash}] }, function(e, o){
		callback(o ? 'ok' : null);
	});
}

exports.getAllRecords = function(callback)
{
	accounts.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
}

exports.delAllRecords = function(callback)
{
	accounts.remove({}, callback); // reset accounts collection for testing //
}

/* private encryption & validation methods */

var generateSalt = function()
{
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback)
{
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}

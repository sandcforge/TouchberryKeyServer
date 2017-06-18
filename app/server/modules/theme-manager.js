var crypto 		= require('crypto');
var moment 		= require('moment');
var envConfig = require('./../../../config');
var themes = require('./db-connection').themes;
var dbApi = require('./db-api');
/* record insertion, update & deletion methods */
exports.addNewTheme = function(newData, callback)
{
	newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
	themes.insert(newData, function(e,ret) {
		if (e) callback(e, null);
		else callback(null, ret.insertedIds);
	});
}

exports.getTheme = function(id, callback)
{
	themes.findOne({_id:dbApi.getObjectId(id)}, function(e, o){
		if (e) callback(e);
		else {
			callback(null,o);
		}
	});
}

exports.updateTheme = function(newData, callback)
{
	themes.findOne({_id:dbApi.getObjectId(newData.id)}, function(e, o){
		if (e) callback(e);
		else {
			o.user 		= newData.user;
			o.pass 	= newData.pass;
			o.date = moment().format('MMMM Do YYYY, h:mm:ss a');
			themes.save(o, {safe: true}, function(e) {
					if (e) callback(e);
					else callback(null, o);
				});
		}
	});
}

/* account lookup methods */

exports.deleteTheme = function(id, callback)
{
	themes.remove({_id: dbApi.getObjectId(id)}, callback);
}

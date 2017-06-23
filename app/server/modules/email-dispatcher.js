var envConfig = require('./../../../config');


var EM = {};
module.exports = EM;

EM.server = require("emailjs/email").server.connect(
{
	host 	    : envConfig.emailHost,
	user 	    : envConfig.emailUser,
	password  : envConfig.emailPass,
	ssl		    : true
});

EM.dispatchResetPasswordLink = function(account, nPass, callback)
{
	EM.server.send({
		from         : envConfig.emailFrom,
		to           : account.email,
		subject      : 'Password Reset',
		text         : 'something went wrong... :(',
		attachment   : EM.composeEmail(account, nPass)
	}, callback );
}

EM.composeEmail = function(user, nPass)
{
	var html = "<html><body>";
		html += "Hi "+user.name+",<br><br>";
		html += "Your username is <b>"+user.user+"</b><br>";
		html += "Your temporary passwordis <b>"+nPass+"</b><br>";
		html += "Please update it immediately<br><br>";
		html += "Cheers,<br>";
		html += "<a href='https://key.touchberry.net'>TouchberryKey</a><br><br>";
		html += "</body></html>";
	return  [{data:html, alternative:true}];
}

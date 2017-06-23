var envConfig = require('./../../config');
var CT = require('./modules/country-list');
var AM = require('./modules/account-manager');
var TM = require('./modules/theme-manager');
var EM = require('./modules/email-dispatcher');
var JWT = require('jsonwebtoken');

module.exports = function(app) {

  // main login page //
	app.get('/', function(req, res){
	// attempt automatic login //
		AM.autoLoginByToken(req.cookies.loginToken, function(e,renewJwtToken,userId){
			if (e) {
					res.render('login', { title: 'Hello - Please Login To Your Account' });
			}
			else {
				res.cookie('loginToken', renewJwtToken, { maxAge: 900000 });
				res.redirect('/home');
			}
		});
	});

	app.post('/', function(req, res){
		AM.manualLogin(req.body['user'], req.body['pass'], function(e, o){
			if (!o){
				res.status(400).send(e);
			}	else{
				let jwtToken = JWT.sign({ user: o._id }, envConfig.tokenEncryptionKey, { expiresIn: envConfig.defaultTokenDuration,issuer: envConfig.appName, audience: envConfig.appName  });
				res.cookie('loginToken', jwtToken, { maxAge: 900000 });
				res.redirect('/home');
			}
		});
	});


	app.post('/theme/post', function(req, res){

		let loginToken = req.cookies.loginToken;
		// check if the user's credentials are saved in a cookie //
		if (loginToken == undefined ){
			res.status(400).send('not login');
		}	else{
			// attempt automatic login //
			if (req.body == undefined || req.body.owner == undefined) {
				res.status(400).send('invalid theme');
			}
			else {

				AM.autoLoginByToken(loginToken, function(err, newToken, userId){
					if (err) {
						res.status(400).send('not login');
					}
					else {
						if (req.body == undefined ||
							  req.body.owner == undefined ||
								req.body.owner != userId ) {
									res.status(400).send('invalid theme');
								}
						else {
							TM.addNewTheme(req.body, function(e, o){
								if (!o){
									res.status(400).send(e);
								}	else{
									res.cookie('loginToken', newToken, { maxAge: 900000 });
									res.status(200).send(o);
								}
							});
						}
					}
				});

			}
		}

	});

	//e.g. http://localhost/theme/get?addr=123435t
	app.get('/theme/get', function(req, res){
		if (req.query.addr) {
			TM.getTheme(req.query.addr, function(e,o) {
				if (!e) res.status(200).send(o);
				else res.status(400).send(e);
			});
		}
		else {
			res.status(400).send('null addr');
		}
	});

  // logged-in user homepage //
	app.get('/home', function(req, res) {
		AM.autoLoginByToken(req.cookies.loginToken, function(e,renewJwtToken,userId){
			if (e) {
					res.render('login', { title: 'Hello - Please Login To Your Account' });
			}
			else {
				res.cookie('loginToken', renewJwtToken, { maxAge: 900000 });
				AM.getAccountById(userId, function(userProfile){
					if (userProfile) {
						res.render('home', {
							title : 'Control Panel',
							countries : CT,
							udata : userProfile
						});
					}
					else {
							res.status(400).send('error user');
					}
				});
			}
		});
	});

	app.post('/home', function(req, res){
		AM.autoLoginByToken(req.cookies.loginToken, function(e,renewJwtToken,userId){
			if (e) {
					res.redirect('/');
			}
			else {
				res.cookie('loginToken', renewJwtToken, { maxAge: 900000 });
				AM.updateAccount({
					id		: userId,
					name	: req.body['name'],
					email	: req.body['email'],
					pass	: req.body['pass'],
					country	: req.body['country']
					}, function(e, o){
					if (e){
						res.status(400).send('error-updating-account');
					}	else{
						res.status(200).send('ok');
					}
				});

			}
		});

	});

	app.post('/logout', function(req, res){
		res.clearCookie('loginToken');
		res.status(200).send('ok');
	})

// creating new accounts //

	app.get('/signup', function(req, res) {
		res.render('signup', {  title: 'Signup', countries : CT });
	});

	app.post('/signup', function(req, res){
		AM.addNewAccount({
			name 	: req.body['name'],
			email 	: req.body['email'],
			user 	: req.body['user'],
			pass	: req.body['pass'],
			country : req.body['country']
		}, function(e){
			if (e){
				res.status(400).send(e);
			}	else{
				res.status(200).send('ok');
			}
		});
	});

  // password reset //

	app.post('/lost-password', function(req, res){
		// look up the user's account via their email //
		AM.getAccountByEmail(req.body['email'], function(user){
			if (user){
				let newPass = AM.getRandomPassword();
				AM.updatePassword(user.email, newPass, function(e, o){
					if (o){
						EM.dispatchResetPasswordLink(user, newPass, function(e, m){
							if (!e){
								res.status(200).send('ok');
							}	else{
								for (k in e) console.log('ERROR : ', k, e[k]);
								res.status(400).send('unable to dispatch password reset');
							}
						});
					}	else{
						res.status(400).send('unable to update password');
					}
				});

			}	else{
				res.status(400).send('email-not-found');
			}
		});
	});

  // view & delete accounts //

	app.get('/print', function(req, res) {
		AM.getAllRecords( function(e, accounts){
			res.render('print', { title : 'Account List', accts : accounts });
		})
	});

	app.post('/delete', function(req, res){
		AM.deleteAccount(req.body.id, function(e, obj){
			if (!e){
				res.clearCookie('loginToken');
			}	else{
				res.status(400).send('record not found');
			}
	    });
	});

	app.get('/reset', function(req, res) {
		AM.delAllRecords(function(){
			res.redirect('/print');
		});
	});


	app.get('/index', function(req, res) {
		res.render('pages/MainPage', { title: 'Express', foo: {userAgent: req.headers['user-agent'] } });
	});

	app.get('/about', function(req, res) {
		res.render('pages/PrivacyPolicyPage', { title: 'Express', foo: {userAgent: req.headers['user-agent'] } });
	});


	app.get('*', function(req, res) {res.render('404', { title: 'Page Not Found'}); });

};


// build mongo database connection url
let dbEnv = process.env.DB_ENV || 'localhost';

let dbPort = process.env.DB_PORT || 27017;
let dbName = process.env.DB_NAME || 'touchberrykey';

let dbHost;
let dbUser;
let dbPass;
let dbURL;
if (dbEnv == 'mongodb.atlas') {
	dbHost0 = process.env.DB_HOST0 || 'cluster0-shard-00-00-smsp4.mongodb.net';
	dbHost1 = process.env.DB_HOST1 || 'cluster0-shard-00-01-smsp4.mongodb.net';
	dbHost2 = process.env.DB_HOST2 || 'cluster0-shard-00-02-smsp4.mongodb.net';
	dbUser = process.env.DB_USER || 'touchberry';
	dbPass = process.env.DB_PASS || 'touchberry!';
	//dbURL = 'mongodb://'+ dbUser +':'+dbPass+'@'+ dbHost +':'+ dbPort + '/' + dbName + '?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
	dbURL = `mongodb://${dbUser}:${dbPass}@${dbHost0}:${dbPort},${dbHost1}:${dbPort},${dbHost2}:${dbPort}/${dbName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`;


}
else {
  dbUser = null;
  dbPass = null;
  dbHost = process.env.DB_HOST0 || 'localhost';
	dbURL = 'mongodb://'+dbHost+':'+dbPort+'/'+dbName;
}

errCode = {
	undefinedLoginToken: 1,
	invalidTheme: 2,
	invalidLoginToken :3,
	noThemeId: 4,
	unkownUser: 5,
	updateAccountFailure: 6,
	updatePasswordFailure: 7,
	emailNotFound : 8,
	wrongPassword : 9,
	userNotFound : 10,
	invalidPassword: 11,
	userTaken: 12,
	emailTaken: 13,
	addNewThemeFailure: 14,
	expiredTheme: 15,
	saveThemeFailure: 16,
};

envConfig = {
  httpPort:   process.env.HTTP_PORT || 80,
  httpsPort:  process.env.HTTPS_PORT || 443,
  nodeEnv:    process.env.NODE_ENV,
	emailHost:  process.env.EMAIL_HOST || 'smtp.gmail.com',
	emailUser:  process.env.EMAIL_USER || 'touchberrykey@gmail.com',
	emailPass:  process.env.EMAIL_PASS || 'Mtu.2015Dota',
	emailFrom:  process.env.EMAIL_FROM || 'TouchberryKey',
  dbEnv:     dbEnv,
  dbHost:    dbHost,
  dbPort:    dbPort,
  dbName:    dbName,
  dbUser:    dbUser,
  dbPass:    dbPass,
	dbURL:     dbURL,
	defaultThemeDuration: 3, //3 days
	defaultTokenDuration: 3 * 24 * 60 * 60, //3 days unit: s
	tokenEncryptionKey: 'MTU123!@#',
	appName: 'touchberrykey',
	errCode: errCode,
}

module.exports = envConfig;

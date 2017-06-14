
// build mongo database connection url
let dbEnv = process.env.DB_ENV || 'localhost';

let dbPort = process.env.DB_PORT || 27017;
let dbName = process.env.DB_NAME || 'touchberrykey';

let dbHost;
let dbUser;
let dbPass;
let dbURL;
if (dbEnv == 'mongodb.atlas') {
	dbHost = process.env.DB_HOST || 'cluster0-shard-00-00-smsp4.mongodb.net';
	dbUser = process.env.DB_USER || 'touchberry';
	dbPass = process.env.DB_PASS || 'touchberry!';
	dbURL = 'mongodb://'+ dbUser +':'+dbPass+'@'+ dbHost +':'+ dbPort + '/' + dbName + '?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

}
else {
  dbUser = null;
  dbPass = null;
  dbHost = process.env.DB_HOST || 'localhost';
	dbURL = 'mongodb://'+dbHost+':'+dbPort+'/'+dbName;
}


envConfig = {
  httpPort:  process.env.HTTP_PORT || 80,
  httpsPort: process.env.HTTPS_PORT || 443,
  nodeEnv:   process.env.NODE_ENV,
  dbEnv:     dbEnv,
  dbHost:    dbHost,
  dbPort:    dbPort,
  dbName:    dbName,
  dbUser:    dbUser,
  dbPass:    dbPass,
	dbURL:     dbURL,
}

module.exports = envConfig;

#[Node-Login](https://nodejs-login.herokuapp.com)

[![node-login](./readme.img/node-login.jpg?raw=true)](https://nodejs-login.herokuapp.com)

###Environment Variables
* DB_ENV = 'mongodb.atlas'
* NODE_ENV = 'dev' || NODE_ENV = 'prod'



###Generate local SSL certificates

* openssl genrsa 1024 > private.key
* openssl req -new -key private.key -out cert.csr
* openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem


##Installation & Setup
1. Install [Node.js](https://nodejs.org/) & [MongoDB](https://www.mongodb.org/) if you haven't already.
2. Clone this repository and install its dependencies.

		> git clone git://github.com/braitsch/node-login.git node-login
		> cd node-login
		> npm install

3. In a separate shell start the MongoDB daemon.

		> mongod

4. From within the node-login directory, start the server.

		> node app

5. Open a browser window and navigate to: [http://localhost:3000](http://localhost:3000)

##Password Retrieval

To enable the password retrieval feature it is recommended that you create environment variables for your credentials instead of hard coding them into the [email dispatcher module](https://github.com/braitsch/node-login/blob/master/app/server/modules/email-dispatcher.js).

To do this on OSX you can simply add them to your .profile or .bashrc file.

	export EMAIL_HOST='smtp.gmail.com'
	export EMAIL_USER='your.email@gmail.com'
	export EMAIL_PASS='1234'

[![node-login](./readme.img/retrieve-password.jpg?raw=true)](https://nodejs-login.herokuapp.com)

##Live Demo

A [Live Demo](https://nodejs-login.herokuapp.com) and [some thoughts about the app's architecture.](http://kitchen.braitsch.io/building-a-login-system-in-node-js-and-mongodb/)

For testing purposes you can view a [database dump of all accounts here](https://nodejs-login.herokuapp.com/print).    
Note this database automatically resets every 24 hours.

##Contributing

Questions and suggestions for improvement are welcome.

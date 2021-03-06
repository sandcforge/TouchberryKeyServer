#[Node-Login](https://www.touchberrykey.com/)

[![node-login](./readme.img/main.png?raw=true)](https://www.touchberrykey.com/)

###Environment Variables
* DB_ENV = 'mongodb.atlas'
* NODE_ENV = 'dev' || NODE_ENV = 'prod'


###Generate local SSL certificates
* openssl genrsa 1024 > private.key
* openssl req -new -key private.key -out cert.csr
* openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem


###Generate SSL certificates using greenlock-express
* install greenlock-express by 'npm install --save greenlock-express@2.x'
* copy the code in app.js
* only set 'opts.domains' and 'opts.email'
* do NOT set 'webrootPath'
* use 'stage' for testing, and then switch to 'https://acme-v01.api.letsencrypt.org/directory'
* remove stuff generated by staging server by 'rm -fr /home/ubuntu/letsencrypt', before switching to 'prod' server
* Clear cookies in the browser
* reference : https://markbuhagiar.wordpress.com/2016/10/31/nodejs-express-letsencrypt-godaddy-noip-2/

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

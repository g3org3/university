/**
 * Home
 */

const Package = require('../package.json');
const Vision = require('vision');
const HandleBars = require('handlebars');
const Path = require('path')

const register =  (server, options, next) => {

	server.register(Vision, err => {
		if (err) {
			return next(err);
		}
	})

	server.views({
		engines: {
			html: HandleBars
		},
		path: Path.join(__dirname, '../views')
	})

	server.route({
   		method: 'GET',
   		path: '/home',
   		handler: (req, reply) => {
   			reply.view('home', {path: Path.join(__dirname, '../views/home.html')})
   		}
	})

	return next();
}

exports.register = register;
exports.register.attributes = {
	name: 'home',
	version: Package.version
}
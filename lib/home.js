/**
 * Home
 */

const Package = require('../package.json')

const register =  (server, options, next) => {
	server.route({
   		method: 'GET',
   		path: '/home',
   		handler: (request, reply) => {
   			reply("hi")
   		}
	})

	next();
}

exports.register = register;
exports.register.attributes = {
	name: 'home',
	version: Package.version
}
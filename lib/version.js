/**
 * Version
 */

const Package = require('../package.json')

const register =  (server, options, next) => {
	server.route({
   		method: 'GET',
   		path: '/version',
   		handler: (request, reply) => reply({version: Package.version})
	})

	next();
}

exports.register = register;
exports.register.attributes = {
	name: 'version',
	version: '0.1.0'
}
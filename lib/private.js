'use strict';

/**
 * Private
 */
const Package = require('../package.json')
const Users = require('./users.json');
const HapiAuthBasic = require('hapi-auth-basic')
const purdy = require('purdy')

const internals = {};

internals.validate = function(req, username, password, next){

	// find user
	let user = Users[username];

	if(!user){
		return next(null, false)
	}

	if(user.password == password){

		return next(null, true, {
			id: user.id,
			name: user.name,
			username: user.username
		})
	}
	else {

		return next(null, false)
	}

}

const register =  (server, options, next) => {

	server.register(HapiAuthBasic, err => {
		server.auth.strategy('simple', 'basic', { validateFunc: internals.validate })
	})

	server.route({
   		method: 'GET',
   		path: '/private',
   		config: {
   			auth: 'simple',
   			handler: (request, reply) => {
   				reply(`Welcome! ${request.auth.credentials.username}`)
   			}
   		}
	})

	next();
}

exports.register = register;
exports.register.attributes = {
	name: 'private',
	version: '0.1.0'
}
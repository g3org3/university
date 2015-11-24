/**
 * Home
 */

const Package 	= require('../package.json');
const Vision 	= require('vision');
const HandleBars= require('handlebars');
const Path 		= require('path')
const Inert 	= require('inert')

const register =  (server, options, next) => {

	server.register(Vision, err => {
		
		if (err) {
			return next(err);
		}

		server.register(Inert, err => {

			if(err){
				return next(err);
			}

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

			server.route({
				method: 'GET',
				path: '/styles/{name}',
				handler: {
					directory: {
						path: './assets/styles'
					}
				}
			})

			server.route({
				method: 'GET',
				path: '/images/{name}',
				handler: {
					directory: {
						path: './assets/images'
					}
				}
			})
			
			server.route({
				method: 'GET',
				path: '/scripts/{name}',
				handler: {
					directory: {
						path: './assets/scripts'
					}
				}
			})

			server.route({
				method: 'GET',
				path: '/login',
				handler: (req, reply) => {
					reply.view('login')
				}
			})

			return next();
		})
	})
}

exports.register = register;
exports.register.attributes = {
	name: 'home',
	version: Package.version
}
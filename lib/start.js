/**
 *	Dependencies
 */

const Server	= require('./index')
const Hoek 		= require('hoek')

Server.init(8080, (err, server) => {

	Hoek.assert(!err, err);
	console.log(`Server running at: ${server.info.uri}`);
});
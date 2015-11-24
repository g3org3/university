'use strict'
/**
 *	Dependencies
 */

const Server	= require('./index')
const Hoek 		= require('hoek')

Server.init(8080, (err, server) => {

	Hoek.assert(!err, err);
	let web = server.select('web')
	let webTls = server.select('web-tls')
	console.log(`Server running at: ${web.info.uri}`);
	console.log(`Server running at: ${webTls.info.uri}`);
});
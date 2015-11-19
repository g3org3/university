'use strict';

/**
 * Dependencies
 */
const Hapi     = require('hapi');
const Package  = require('../package.json')

const server = new Hapi.Server();
server.connection({
   port: 8080
})

const internals = {};

internals.response = {version: Package.version}

server.route({
   method: 'GET',
   path: '/version',
   handler: (request, reply) => reply(internals.response)
})

// start server
server.start(err => {

   if(err){
      throw err;
   }
   console.log(`Server running at: ${server.info.uri}`);
})
'use strict';

/**
 * Dependencies
 */
const Hapi     = require('hapi');
const Package  = require('../package.json')
const Version  = require('./version')

const server = new Hapi.Server();
server.connection({
   port: 8080
})

//
const internals = {};

server.register(Version, (err)=> {
   if(err)
      console.log(err)
})

// start server
server.start(err => {

   if(err){
      throw err;
   }
   console.log(`Server running at: ${server.info.uri}`);
})
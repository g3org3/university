'use strict';

/**
 * Dependencies
 */
const Hapi     = require('hapi');
const Hoek     = require('hoek');
const Package  = require('../package.json')
const Version  = require('./version')

const internals = {};

internals.init = (port, cb) => {
   let server = new Hapi.Server();
   
   server.connection({
      port: Number(port || 8000)
   })
   
   server.register(Version, err => {

      if(err) {
         throw err;
      }
   });

   // start server
   server.start(err => {
      return typeof cb == "function" && cb(err, server);
   })
}

exports.init = internals.init;
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
   
   server.connection({port: port})
   
   server.register(Version, err => {

      if(err) {
         return cb(err, server);
      }

      // start server
      server.start(err => {
         return cb(err, server);
      })
   });
}

exports.init = internals.init;
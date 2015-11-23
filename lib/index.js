'use strict';

/**
 * Dependencies
 */
const Hapi     = require('hapi');
const Hoek     = require('hoek');
const Glue     = require('glue')

// declare internals
const internals = {};

internals.plugins = [
   'private',
   'version',
   'home'
]

internals.getPlugins = () => {
   let plugs = []
   for (var i = 0; i < internals.plugins.length; ++i) {

      let key = `./${internals.plugins[i]}`
      let obj = {};
      obj[key] = [{ select: ['web'] }]
      plugs.push(obj)
   };
   return plugs;
}

internals.init = (port, next) => {
   let manifest = {
      connections: [{ port: port, labels: ['web'] }],
      plugins: internals.getPlugins()
   }

   let options = {
      relativeTo: __dirname
   }

   Glue.compose(manifest, options, (err, server) => {

      if (err) {
         return next(err);
      }
      
      server.start(err => {
         return next(err, server)
      })
   })
}

exports.init = internals.init;
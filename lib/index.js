'use strict';

/**
 * Dependencies
 */
const Hapi     = require('hapi');
const Hoek     = require('hoek');
const Glue     = require('glue');
const Fs       = require('fs');
const Path     = require('path');

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
      let obj = {};
      obj[`./${internals.plugins[i]}`] = [{ select: ['web', 'web-tls'] }]
      plugs.push(obj)
   };
   return plugs;
}

internals.key = Fs.readFileSync(Path.resolve(__dirname, 'certs/device.key'))
internals.cert = Fs.readFileSync(Path.resolve(__dirname, 'certs/device.crt'))

internals.init = (port, next) => {
   let manifest = {
      connections: [
         {
            host: 'localhost',
            port: 8081,
            labels: ['web-tls'],
            tls: {
               ca: [],
               key: internals.key,
               cert: internals.cert
            }
         },
         {
            host: 'localhost',
            port: 8080,
            labels: ['web']
         }
      ],
      plugins: internals.getPlugins()
   }

   let options = {
      relativeTo: __dirname
   }

   Glue.compose(manifest, options, (err, server) => {

      if (err) {
         return next(err);
      }
      
      server.select('web').ext({
         type: 'onRequest', 
         method: (request, reply) => {
            return reply.redirect('https://localhost:8081' + request.url.path).permanent();
         }
      });

      server.start(err => {
         return next(err, server)
      })
   })
}

exports.init = internals.init;
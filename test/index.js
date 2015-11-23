'use strict';
/**
 * Dependencies
 */
const MonkeyPatch = require('monkeypatch')
const Code    = require('code')
const Hapi    = require('hapi')
const Lab     = require('lab')
const Version = require('../lib/version')
const Server  = require('../lib')


const lab = exports.lab = Lab.script()

lab.experiment('Server', () => {

   lab.test('should not throw errors', done => {

      Server.init(2000, (err, server) => {

         Code.expect(err).to.not.exist()
         Code.expect(server).to.be.instanceof(Hapi.Server);
         server.stop(done)
      })
   })

   lab.test('should start on port 4000', done => {

      Server.init(4000, (err, server) => {

         Code.expect(err).to.not.exist()
         Code.expect(server.info.port).to.equal(4000)
         server.stop(done)
      })
   })

   lab.test('should throw err when register a plugin', done => {
      
      var original = Version.register;
       Version.register = function (server, options, next) {
           Version.register = original;
           return next(new Error('fallo'));
       };

      Version.register.attributes = {name: 'fake'}
      
      Server.init(2001, (err, server) => {

         Code.expect(err).to.exist()
         Code.expect(err.message).to.equal('fallo')
         server.stop(done)
      })
   })
})
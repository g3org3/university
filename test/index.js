'use strict';
/**
 * Dependencies
 */
const MonkeyPatch = require('monkeypatch')
const Code    = require('code')
const Hapi    = require('hapi')
const Lab     = require('lab')
const Server  = require('../lib')
const Version = require('../lib/version')
const Private = require('../lib/private')


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

   lab.test('should throw err when register version plugin', done => {
      
      var original = Version.register;
       Version.register = function (server, options, next) {
           Version.register = original;
           return next(new Error('fallo'));
       };

      Version.register.attributes = {name: 'fake'}
      
      Server.init(2001, (err, server) => {

         Code.expect(err).to.exist()
         Code.expect(err.message).to.equal('fallo')
         done();
      })
   })

   lab.test('should throw err when register private plugin', done => {
      
      var original = Private.register;
       Private.register = function (server, options, next) {
           Private.register = original;
           return next(new Error('fallo'));
       };

      Private.register.attributes = {name: 'fake'}
      
      Server.init(2002, (err, server) => {

         Code.expect(err).to.exist()
         Code.expect(err.message).to.equal('fallo')
         done();
      })
   })
})
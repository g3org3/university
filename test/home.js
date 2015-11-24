'use strict';

/**
 * Dependencies
 */
const Code    = require('code')
const Lab     = require('lab')
const Package = require('../package.json')
const Server  = require('../lib')
const Path    = require('path')
const Vision  = require('vision')
const Inert   = require('inert')

const lab = exports.lab = Lab.script()

// internals
const internals = {}

// shortcuts
let expect = Code.expect
let it = lab.test;
let describe = lab.experiment

describe('/home', () => {

   it('should return view\'s path', done => {

      Server.init(2006, (err, server) => {

         expect(err).to.not.exist()
         server.inject('/home', res => {

            let dir = Path.join(__dirname, '../views/home.html')
            expect(res.statusCode).to.equal(200)
            expect(res.result).to.equal(dir)
            server.stop(done)
         })
      })
   })

   it('should handle vision plugin err', done => {

      var original = Vision.register;
       Vision.register = function (server, options, next) {
           Vision.register = original;
           return next(new Error('fallo'));
       };

      Vision.register.attributes = {name: 'fake'}
      
      Server.init(2001, (err, server) => {

         expect(err).to.exist()
         expect(err.message).to.equal('fallo')
         done();
      })
   })

   it('should handle inert plugin err', done => {

      var original = Inert.register;
       Inert.register = function (server, options, next) {
           Inert.register = original;
           return next(new Error('fallo'));
       };

      Inert.register.attributes = {name: 'fake'}
      
      Server.init(2001, (err, server) => {

         expect(err).to.exist()
         expect(err.message).to.equal('fallo')
         done();
      })
   })

   it('should return login page', done => {
      
      Server.init(2007, (err, server) => {

         expect(err).to.not.exist()
         server.inject('/login', res => {

            expect(res.statusCode).to.equal(200);
            server.stop(done) 
         })
      })
   })
})








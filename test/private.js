'use strict';

/**
 * Dependencies
 */
const Code    = require('code')
const Lab     = require('lab')
const Package = require('../package.json')
const Server  = require('../lib')
const purdy = require('purdy')

const lab = exports.lab = Lab.script()

// internals
const internals = {}

// shortcuts
let expect = Code.expect
let it = lab.test;
let describe = lab.experiment

describe('/private', () => {

   it('should log in with credentials', done => {

      Server.init(2005, (err, server) => {

         expect(err).to.not.exist()
         server.inject(internals.request('Ab1234'), res => {

            expect(res.statusCode).to.equal(200)
            expect(res.request.auth.credentials.name).to.equal('Jorge Adolfo')
            expect(res.result).to.equal('Welcome! george')
            server.stop(done)
         })
      })
   })

   it('shouldn\'t log in with wrong password', done => {

      Server.init(2005, (err, server) => {

         expect(err).to.not.exist()
         server.inject(internals.request('ab1234'), res => {

            expect(res.statusCode).to.equal(401)
            server.stop(done)
         })
      })
   })

   it('shouldn\'t log in with wrong username', done => {

      Server.init(2005, (err, server) => {

         expect(err).to.not.exist()
         server.inject(internals.request('Ab1234', 'miguel'), res => {

            expect(res.statusCode).to.equal(401)
            server.stop(done)
         })
      })
   })   
})


internals.header = function (username, password) {
    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};

internals.request = (passwd, name) => {
   return {
      method: 'GET',
      url: '/private',
      headers: {
         authorization: internals.header(name || 'george', passwd)
      }
   }
}
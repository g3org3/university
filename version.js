/**
 * Dependencies
 */
const Code    = require('code')
const Lab     = require('lab')
const Package = require('../package.json')
const Server  = require('../lib')

const lab = exports.lab = Lab.script()

lab.experiment('/version', () => {
 
    lab.test('should return version', done => {
 
      Server.init(3030, (err, server) => {

         Code.expect(err).to.not.exist()
         server.inject('/version', res => {

            Code.expect(res.statusCode).to.equal(200)
            Code.expect(res.result).to.deep.equal({version: Package.version})
            server.stop(done);
         })
      })
    })
})
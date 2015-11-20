/**
 * Dependencies
 */
var Code    = require('code');
var Lab     = require('lab');
var Package = require('../package.json');
var Version = require('../lib/version')

var lab = exports.lab = Lab.script();

lab.experiment('Server', function () {
 
    lab.test('should not throw err', function (done) {
      var Server  = require('../lib')
      Server.init((err, server) => {
         Code.expect(err).to.not.exist();
         done();
      })
    });


})

lab.experiment('server 2', function(){
    lab.test('handles register plugin errors', { parallel: false }, function (done) {

       Version.register = function (server, options, next) {
           return next(new Error('error'));
       };

       Version.register.attributes = {
         name: 'demo'
       }
       
       Server.init((err, server) => {
         
           expect(err).to.exist();
           expect(err.message).to.equal('error');
           done();
       });
   });
});
var log = require('./log');
var config = require('../config/app.json');
var Worker = require('pigato').Worker;
var userManager = require('./manager/user');

var worker = new Worker(config.broker.host, 'user');

worker.on('error', function(e) {
  log.error('Worker error', e);
});

worker.on('request', function(input, rep) {
  log.info('Worker request', input);

  switch(input.op) {
    case 'getUser':
      log.info('Finding user[' + input.params.id + ']...');
      userManager.getUser(input.params.id, function(err, user) {
        rep.end({result: user, error: err});
      });
      break;
    case 'createUser':
      log.info('Creating a new user...');
      userManager.createUser(input.params.userData, function(err, user) {
        rep.end({result: user, error: err});
      });
      break;
  }
});

module.exports = {
  start: function() {
    log.info('Starting worker, broker ' + config.broker.host + '...');
    worker.start();
  }
};

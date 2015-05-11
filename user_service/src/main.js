var Worker = require('pigato').Worker;
var config = require('../config/app.json');
var userManager = require('./manager/user');

var worker = new Worker(config.broker.host, 'user');
console.log('Starting worker: ', config.broker.host);
worker.start();

worker.on('error', function(e) {
  console.error('PIGATO WORKER ERROR', e);
});

worker.on('request', function(input, rep) {
  console.log('PIGATO request', input);

  switch(input.op) {
    case 'getById':
      console.log('Finding user[' + input.params.id + ']...');
      userManager.getById(input.params.id, function(err, user) {
        console.log('getById->', err, user);
        rep.end(user);
      });
      break;
  }
});

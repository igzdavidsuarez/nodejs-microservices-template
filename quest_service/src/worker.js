var log = require('./log');
var config = require('../config/app.json');
var Worker = require('pigato').Worker;
var questManager = require('./manager/quest');

var worker = new Worker(config.broker.host, 'quest');

worker.on('error', function(e) {
  log.error('Worker error', e);
});

worker.on('request', function(input, rep) {
  log.info('Worker request', input);

  switch(input.op) {
    case 'getQuests':
      log.info('Finding quest...');
      questManager.getQuests(function(err, quest) {
        rep.end({result: quest, error: err});
      });
      break;
    case 'createQuest':
      log.info('Creating a new quest...');
      questManager.createQuest(input.params.quest, function(err, quest) {
        rep.end({result: quest, error: err});
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

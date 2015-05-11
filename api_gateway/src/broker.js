var config = require('../config/app.json');
var log = require('./log');
var Broker = require('pigato').Broker;

var broker = new Broker(config.broker.host);

broker.on('error', function(err) {
  log.error('broker', err);
});

module.exports = broker;

#!/bin/sh

var config = require('../config/app');
var server = require('../src/server');
var broker = require('../src/broker');
var log = require('../src/log');

broker.start(function() {
  log.info('Events broker server started on %s', config.broker.host);

  server.listen(config.port, function() {
    log.info('%s listening at %s', server.name, server.url);
  });
});

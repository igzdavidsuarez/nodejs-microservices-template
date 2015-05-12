var mongoose = require('mongoose');
var config = require('../config/app.json');
var log = require('./log');

mongoose.set('debug', true);

module.exports = {
  connect: function(done) {
    log.info('Connecting to MongoDB...');

    mongoose.connect(config.db.conn, function(err) {
      if (err) throw err;
      log.info('Connected to MongoDB');

      mongoose.connection.on('error', function(err) {
        log.error(err);
      });
    });

    done();
  }
};

var Client = require('pigato').Client;
var config = require('../config/app.json');

var client = new Client(config.broker.host);
client.start();

client.on('error', function(e) {
  console.log('PIGATO CLIENT ERROR', e);
});

module.exports = {
  user: {
    getById: function(id, callback) {

      // TODO service.send('user', 'getById', {id: id}, callback);

      client.request(
        'user', {op: 'getById', params: {id: id}},
        null,
        function(err, data) {
          callback(err, data);
        }, { timeout: 10000 }
      );
    }
  }
};

var Client = require('pigato').Client;
var config = require('../config/app.json');

var client = new Client(config.broker.host);
client.start();

client.on('error', function(e) {
  console.log('PIGATO CLIENT ERROR', e);
});

function clientRequest(service, op, params, callback) {
  client.request(
    service,
    {op: op, params: params},
    null,
    function(err, data) {
      if (err) {
        console.error(err);
        return callback(err);
      }

      callback(data.error, data.result);
    },
    {timeout: 10000}
  );
}

module.exports = {
  user: {
    getUser: function(id, callback) {
      clientRequest('user', 'getUser', {id: id}, callback);
    },
    createUser: function(userData, callback) {
      clientRequest('user', 'createUser', {userData: userData}, callback);
    }
  }
};

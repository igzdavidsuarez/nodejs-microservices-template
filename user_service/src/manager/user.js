var log = require('../log');
var User = require('../model/user');

module.exports = {
  getUser: getUser,
  createUser: createUser
};

function getUser(id, callback) {
  log.info('Looking for user[' + id + ']...');
  User.findById(id).exec(callback);
}

function createUser(userInput, callback) {
  log.info('Creating user...');
  var user = new User(userInput);
  user.save(callback);
}

var services = require('services');
var userManager = require(process.cwd() + '/api_gateway/src/manager/user');

module.exports = function(server) {
  server.get('/user/quests', getUserQuest);
  server.get('/user/:id', getUser);
  server.post('/user', createUser);
};

function getUser(req, res, next) {
  req.log.info('Searching user[' + req.params.id + ']...');

  services.user.getUser(req.params.id, function(err, data) {
    if (err) {
      return res.send({error: err});
    }
    res.send(data);
  });

  return next();
}

function createUser(req, res, next) {
  req.log.info('Creating new user...');

  services.user.createUser(req.body, function(err, data) {
    if (err) {
      return res.send({error: err});
    }
    res.send(data);
  });

  return next();
}

function getUserQuest(req, res, next) {
  req.log.info('Looking for user quests...');

  userManager.getUserQuests(req.query.id, function(err, data) {
    if (err) {
      return res.send({error: err});
    }
    res.send(data);
  });

  return next();
}

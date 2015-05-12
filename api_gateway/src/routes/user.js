var services = require('services');

module.exports = function(server) {
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

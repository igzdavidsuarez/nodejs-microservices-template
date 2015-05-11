var services = require('services');

module.exports = function(server) {
  server.get('/user/:id', getUser);
};

function getUser(req, res, next) {
  req.log.info('Searching user[' + req.params.id + ']...');

  services.user.getById(req.params.id, function(err, data) {
    if (err) {
      return res.send({error: err});
    }
    res.send(data);
  });

  return next();
}

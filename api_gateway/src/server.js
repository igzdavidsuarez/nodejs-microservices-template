var fs = require('fs');
var path = require('path');
var restify = require('restify');
var log = require('./log');
var packageJson = require('../package.json');

const ROUTES_FOLDER = './routes/';

var server = restify.createServer({
  name: packageJson.name,
  version: packageJson.version,
  log: log
});

server.use(restify.requestLogger());
server.on('after', function(request, response, route, error) {
  request.log.info({req: request, res: response, error: error}, 'Request');
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.fullResponse());

fs.readdirSync(path.join(__dirname, ROUTES_FOLDER)).forEach(function loadRoutes(file) {

  if (~file.indexOf('.js')) {
    require(ROUTES_FOLDER + file)(server);
    log.info('Router ' + file + ' loaded');
  }

});

module.exports = server;

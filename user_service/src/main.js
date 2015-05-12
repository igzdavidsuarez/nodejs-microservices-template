var worker = require('./worker');
var mongodb = require('./mongodb');

mongodb.connect(function() {
  worker.start();
});

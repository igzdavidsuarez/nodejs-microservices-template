#!/bin/sh

var worker = require('../src/worker');
var mongodb = require('../src/mongodb');

mongodb.connect(function() {
  worker.start();
});

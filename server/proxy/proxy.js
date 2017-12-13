var request = require('request');
var serverConfig = require('../config').server;
var _ = require('underscore');
var Promise = require("bluebird");
var _request = Promise.promisifyAll(request);
var prefix = serverConfig.host + ':' + serverConfig.port;
var query = function(options) {
  options.url = prefix + options.path;
  return _request.getAsync(options).spread(function(res, body) {
    return body;
  }).catch(function(err) {
    console.log(err);
    return err;
  });
};
module.exports = {
  Get: function(path, params) {
    var options = {
      path: path,
      method: 'GET'
    };
    return query(options);
  }
};

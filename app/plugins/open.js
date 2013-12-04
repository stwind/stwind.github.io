var open = require('open');

module.exports = function(env, callback) {
  var host = env.config.hostname || 'localhost',
      port = env.config.port;
  open('http://' + host + ':' + port + '/');
  callback();
};

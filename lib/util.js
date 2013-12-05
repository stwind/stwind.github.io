var fs = require('fs');

module.exports.isDir = function(path, callback) {
  fs.stat(path, function(error, stat) {
    var result = stat ? stat.isDirectory() : false;
    callback(error, result);
  });
}

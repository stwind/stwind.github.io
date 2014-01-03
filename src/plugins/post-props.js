var yfm = require('assemble-yaml'),
    path = require('path'),
    _ = require('lodash');

var options = {
  stage: 'render:pre:pages'
};

var plugin = function(params, next) {

  var options = params.assemble.options,
  grunt = params.grunt;

  var postsOpt = grunt.config(['assemble','posts','files'])[0];
  var files = grunt.file.expand(postsOpt.cwd + '/' + postsOpt.src);
  var posts = options.posts = [];

  _.forEach(files, function(file) {
    var raw = yfm.extract(file),
        context = raw.context;

    context.text = raw.content;
    context.name = path.basename(file, '.md');

    posts.push(context);
  });

  next();
};

plugin.options = options;
module.exports = plugin;

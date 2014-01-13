var yfm = require('assemble-yaml'),
    path = require('path'),
    _ = require('lodash');

var options = {
  stage: 'render:pre:pages'
};

var plugin = function(params, next) {

  var options = params.assemble.options,
      grunt = params.grunt;

  var postsOpt = grunt.config(['assemble','posts','files'])[0],
      files = grunt.file.expand(postsOpt.cwd + '/' + postsOpt.src),
      posts = [];

  _.forEach(files, function(file) {
    var raw = yfm.extract(file),
        context = raw.context;

    context.text = raw.content;

    posts.push(context);
  });

  options.posts = _(posts).sortBy("time").reverse().valueOf();

  next();
};

plugin.options = options;
module.exports = plugin;

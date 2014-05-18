var yfm = require('assemble-yaml'),
    path = require('path'),
    _ = require('lodash');

var options = {
  stage: 'render:pre:pages'
};

var plugin = function(params, next) {

  var options = params.assemble.options,
      grunt = params.grunt,
      pages = options.pages;

  _.forEach(pages, function(page) {
    page.data.next = _.map(page.data.next, function(node){
      var nodePage = _.find(pages, {basename: node});
      return _.extend(_.clone(nodePage.data), {content: nodePage.page});
    });
  });

  next();
};

plugin.options = options;
module.exports = plugin;

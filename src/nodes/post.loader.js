var Remarkable = require('remarkable');
var meta = require('remarkable-meta');
var hljs = require('highlight.js');
var _ = require('lodash');

var extend = function (obj, source) {
  var prop;

  for (prop in source) {
    if (source.hasOwnProperty(prop)) {
      obj[prop] = source[prop];
    }
  }

  return obj;
};

module.exports = function(content) {
  this.cacheable();

  var opts = extend({
    preset: 'default',
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {}
      }

      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {}

      return '';
    }
  }, this.options.remarkable);

  var parser = new Remarkable(opts.preset, opts);

  parser.use(meta);

  var mdText = parser.render(content);

  var value = _.assign({content: mdText}, parser.meta);

  return "module.exports = " + JSON.stringify(value);
}

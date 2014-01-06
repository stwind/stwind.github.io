var genContText = function(text, name, tag, classes) {
  return '<a href="' + name + '#' + tag + '" class="' + classes + '">__' 
  + text + '__</a>';
};

var excerpt = function(text, name, options) {
  var delimiter = options.hash['delimiter'] || '\\[readmore\\]',
      regexp = new RegExp(delimiter + ':\\s*#(.*)'),
      contText = options.hash['readmore'] || 'Read More...',
      classes = options.hash['class'] || 'post-continue',
      content = text,
      result = text.match(regexp);

  if (result) {
    contText = genContText(contText, name, result[1], classes);
    content = content.substr(0, result.index) + contText;
  }
  return content;
};

module.exports = {
  excerpt: excerpt
};

module.exports = function(env, options) {
  var livereload = env.helpers.livereload;
  return livereload ? livereload() : options.fn(this);
}

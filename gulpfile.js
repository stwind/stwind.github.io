'use strict';

var gulp = require('gulp');
var _ = require('lodash');
var $ = require('gulp-load-plugins')();
var $log = $.util.log;

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('webpack', function () {
  return gulp.src('src/scripts/main.js')
  .pipe($.webpack(webpackConfig))
  .pipe(gulp.dest('.tmp/scripts'));
});

gulp.task('serve', function (callback) {
  var compiler = webpack(webpackConfig),
      host = 'localhost', port = 8080,
      address = 'http://' + host + ':' + port + '/webpack-dev-server/';

  new WebpackDevServer(compiler, {
    contentBase: 'src/',
    hot: true, port: port,
    publicPath: '/assets/'
  })
  .listen(port, host, function (err){
    if (err) $log('[webpack-dev-server] error', err);

    $log('[webpack-dev-server]', address);
    require('opn')(address);
  });
});

gulp.task('default', function () {
});

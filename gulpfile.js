'use strict';

var gulp = require('gulp');
var _ = require('lodash');
var $ = require('gulp-load-plugins')();
var $log = $.util.log;
var gulpsmith = require('gulpsmith');
var markdown = require('metalsmith-markdown');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('webpack', function () {
  return gulp.src('src/scripts/main.js')
  .pipe($.webpack(webpackConfig))
  .pipe(gulp.dest('.tmp/scripts'));
});

gulp.task('webpack-dev-server', function (callback) {
  var compiler = webpack(webpackConfig),
      port = 8080;

  new WebpackDevServer(compiler, {
    contentBase: 'src/',
    hot: true,
    publicPath: '/assets/',
    port: port
  })
  .listen(port, 'localhost', function (err){
    if (err) $log('[webpack-dev-server] error', err);

    $log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/');
    require('opn')('http://localhost:8080/webpack-dev-server/');
  });
});

gulp.task('default', function () {
  return gulp.src('src/nodes/*.md')

  .pipe($.frontMatter()).on('data', function(file){
    _.assign(file, file.frontMatter);
    delete file.frontMatter;
  })

  .pipe(
    gulpsmith()
    .use(markdown())
  )

  .pipe(gulp.dest('.tmp/nodes'));
});

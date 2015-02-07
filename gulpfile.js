'use strict';

var fs = require('fs');

var gulp = require('gulp');
var _ = require('lodash');
var $ = require('gulp-load-plugins')();
var $log = $.util.log;
var sh = require('shelljs');
var argv = require('yargs').argv;

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

var DIST = 'dist';

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('webpack', function () {
  return gulp.src('src/scripts/main.js')
  .pipe($.webpack(webpackConfig))
  .pipe(gulp.dest(DIST));
});

gulp.task('serve', function (done) {
  var compiler = webpack(webpackConfig),
      host = '0.0.0.0', port = 8080;

  new WebpackDevServer(compiler, {
    contentBase: 'src/',
    hot: true, port: port,
    publicPath: '/assets/'
  })
  .listen(port, host, function (err){
    if (err) $log('[webpack-dev-server] error', err);

    $log('[webpack-dev-server] started');
    require('opn')('http://localhost:8080/webpack-dev-server/');
  });
});

gulp.task('setup', function (done) {
  var pwd = process.cwd();

  function getRemoteUrl() {
    var cmd = 'git config --get remote.origin.url';
    return sh.exec(cmd, { silent: true }).output.trim();
  }

  function setup() {
    var remote = getRemoteUrl();

    sh.mkdir(DIST);
    sh.cd(DIST);
    sh.exec('git init');
    sh.exec('git remote add origin ' + remote);
    sh.exec('git pull origin master');
    sh.exec('git branch --set-upstream-to=origin/master master');
    sh.cd(pwd);
    done();
  }

  if (argv.f) sh.rm('-rf', DIST);

  if (!fs.existsSync(DIST + '/.git')) setup();
});

gulp.task('default', function () {
});

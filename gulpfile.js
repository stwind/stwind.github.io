'use strict';

var fs = require('fs');

var gulp = require('gulp');
var moment = require('moment');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();
var $log = $.util.log;
var sh = require('shelljs');
var argv = require('yargs').argv;

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var webpackDistConfig = require('./webpack.dist.config.js');

var DIST = 'dist';

gulp.task('clean', require('del').bind(null, [
  DIST + '/*', 
  '!' + DIST + '/.git*'
]));

gulp.task('assets', function() {
  var src = ['src/index.html','src/fonts/*'];
  return gulp.src(src)
    .pipe($.copy(DIST, { prefix: 1 }))
    .pipe($.size({title: 'assets'}));
});

gulp.task('webpack', function () {
  return gulp.src('src/scripts/main.js')
  .pipe($.webpack(webpackDistConfig))
  .pipe(gulp.dest(DIST + '/assets'))
  .pipe($.size({ title: 'webpack' }));
});

gulp.task('build', ['clean'], function(cb) {
  runSequence(['webpack', 'assets'], cb);
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

gulp.task('deploy', function (done) {
    var pwd = process.cwd();

    var time = moment().local().format(),
        msg = '"Site updated at ' + time + '"';

    sh.cd(DIST);
    sh.exec('git pull');
    sh.exec('git add -A');
    $log('Committing: ' + msg);
    sh.exec('git commit -m ' + msg);
    $log(' OK');
    $log('Pushing: ' + msg);
    sh.exec('git push origin master');
    $log(' OK');
    $log('Github Page deploy completed.');
    sh.cd(pwd);
});

gulp.task('default', function () {
});

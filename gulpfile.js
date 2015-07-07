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
var webpackStream = require('webpack-stream');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var webpackDistConfig = require('./webpack.dist.config.js');

gulp.task('clean', require('del').bind(null, ['dist/*','!dist/.git*']));

// gulp.task('assets', function() {
//   var src = ['src/index.html'];
//   return gulp.src(src)
//     .pipe($.copy('dist', { prefix: 1 }))
//     .pipe($.size({title: 'assets'}));
// });

gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe($.useref())
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'html'}));
});

gulp.task('webpack', function () {
  return gulp.src('src/scripts/main.js')
  .pipe(webpackStream(webpackDistConfig))
  .pipe(gulp.dest('dist/assets'))
  .pipe($.size({ title: 'webpack' }));
});

gulp.task('build', ['clean'], function(cb) {
  runSequence(['webpack', 'html'], cb);
});

gulp.task('serve', function (done) {
  var compiler = webpack(webpackConfig),
      host = '0.0.0.0', port = 8080;

  new WebpackDevServer(compiler, {
    contentBase: 'src/',
    hot: true, port: port,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  })
  .listen(port, host, function (err){
    if (err) $log('[webpack-dev-server] error', err);

    $log('[webpack-dev-server] started');
    // require('opn')('http://localhost:8080/');
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

    sh.mkdir('dist');
    sh.cd('dist');
    sh.exec('git init');
    sh.exec('git remote add origin ' + remote);
    sh.exec('git pull origin master');
    sh.exec('git branch --set-upstream-to=origin/master master');
    sh.cd(pwd);
    done();
  }

  if (argv.f) sh.rm('-rf', 'dist');

  if (!fs.existsSync('dist/.git')) setup();
});

gulp.task('deploy', function (done) {
    var pwd = process.cwd();

    var time = moment().local().format(),
        msg = '"Site updated at ' + time + '"';

    sh.cd('dist');
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

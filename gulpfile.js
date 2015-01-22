'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var $log = $.util.log;

var gulpsmith = require('gulpsmith');
var markdown = require('metalsmith-markdown');

gulp.task('clean', require('del')
          .bind(null, ['.tmp', 'dist']));

gulp.task('default', function () {
  return gulp.src('src/nodes/*.md')
  .pipe(
    gulpsmith()
    .use(markdown())
  )
  .pipe(gulp.dest('./build'))
});

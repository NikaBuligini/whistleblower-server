const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const bump = require('gulp-bump');
const argv = require('yargs').argv;

gulp.task('mdl-css', () => gulp.src('./node_modules/material-design-lite/material.min.css')
    .pipe(gulp.dest('./public')));

gulp.task('mdl-js', () => gulp.src('./node_modules/material-design-lite/material.min.js')
    .pipe(gulp.dest('./public')));

gulp.task('start', () => {
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: { NODE_ENV: 'development', DEBUG: 'http,worker' },
    watch: ['server.js', 'routes.js', 'app'],
    ignore: ['app/views/*.jsx', 'app/react/*.js'],
  });
});

gulp.task('build', ['mdl-css', 'mdl-js']);

/**
 * Usage:
 *   gulp bump
 *   gulp bump --major
 *   gulp bump --minor
 *   gulp bump --appversion 1.2.3
 */
gulp.task('bump', () => {
  const options = {};

  if (argv.major === true) options.type = 'major';
  else if (argv.minor === true) options.type = 'minor';
  else if (argv.appversion !== 'undefined') options.version = argv.appversion;

  gulp.src('./package.json')
    .pipe(bump(options))
    .pipe(gulp.dest('./'));
});

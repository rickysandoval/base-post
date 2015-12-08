// NPM modules
var gulp = require('gulp')
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var cssnext = require('cssnext')
var postcss = require('gulp-postcss')
var stylelint = require('stylelint')
var reporter = require('postcss-reporter')

// Local imports
var config = require('./config')

gulp.task('serve', ['compileCss'], function() {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'StyleGuide.html'
    }
  });

  gulp.watch('styles/src/**/*.css', ['compileCss']);
  gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('csslint', function () {
  return gulp.src('./src/**/*.css')
  .pipe(postcss([
    stylelint({
      'rules': config.rules
    }),
    reporter({
      clearMessages: true
    })
  ]))
});

gulp.task('compileCss', ['csslint'], function() {
  return gulp.src('./styles/src/main.css')
    .pipe(postcss([
      require('precss')({}),
      cssnext({
        compress: true
      })
    ]))
    .pipe(gulp.dest('./styles/dist'))
    .pipe(browserSync.stream());
});

gulp.task('compileAndMinCss', function() {
  return gulp.src('./styles/src/main.css')
    .pipe(postcss([
      require('precss')({}),
      cssnext({
        compress: true
      })
    ]))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./styles/dist'));
});

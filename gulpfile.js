// NPM modules
var gulp = require('gulp')
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var cssnext = require('postcss-cssnext');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');


gulp.task('serve', ['buildCss'], function() {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'StyleGuide.html'
    }
  });

  gulp.watch('styles/src/**/*.css', ['buildCss']);
  gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('buildCss', function() {
  return gulp.src('./styles/src/main.css')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(postcss([
      require('precss')({}),
      require('autoprefixer'),
      cssnext({
        compress: true,
        sourcemap: true
      })
    ]))
    .on('error', function(e){ console.log(e.message); this.emit('end'); })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./styles/dist'))
    .pipe(browserSync.stream());
});

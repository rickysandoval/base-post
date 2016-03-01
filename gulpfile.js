// NPM modules
const gulp = require('gulp')
const rename = require('gulp-rename');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();
const cssnext = require('postcss-cssnext');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const del = require('del');

gulp.task('clean', function(){
  del(['styles/dist']);
});

gulp.task('serve', ['dev'], function() {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'demo.html'
    }
  });

  gulp.watch(['styles/src/**/*.css', '_demo.css'], ['dev']);
  gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('dev', function() {
  return gulp.src('./_demo.css')
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
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

gulp.task('build', function() {
  return gulp.src('./styles/src/main.css')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(postcss([
      require('precss')({}),
      require('autoprefixer'),
      cssnext({
        compress: true,
        sourcemaps: false
      })
    ]))
    .on('error', function(e){ console.log(e.message); this.emit('end'); })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./styles/dist'))
    .pipe(browserSync.stream());
});


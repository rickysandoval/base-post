// NPM modules
const gulp = require('gulp'),
      rename = require('gulp-rename'),
      watch = require('gulp-watch'),
      browserSync = require('browser-sync').create(),
      cssnext = require('postcss-cssnext'),
      postcss = require('gulp-postcss'),
      sourcemaps = require('gulp-sourcemaps'),
      plumber = require('gulp-plumber'),
      del = require('del'),
      jshint = require('gulp-jshint'),
      concat = require('gulp-concat'),
      clean = require('gulp-clean'),
      ngAnnotate = require('gulp-ng-annotate'),
      templateCache = require('gulp-angular-templatecache'),
      modRewrite = require('connect-modrewrite');

gulp.task('clean', function(){
  del(['styles/dist']);
});

gulp.task('serve', ['vendor', 'dev', 'js', 'templates', 'copy-index', 'copy-assets'], function() {
  browserSync.init({
    server: {
      baseDir: './demo-build',
      index: 'index.html',
      middleware: [
          modRewrite([
              '^[^\\.]*$ /index.html [L]'
          ])
      ]
    }
  });

  gulp.watch(['styles/src/**/*.css', 'demo-src/style/demo.css'], ['dev']);
  gulp.watch(['demo-src/app/*.js', 'demo-src/app/**/*.js', 'demo-src/app/**/*.html'], ['js']);
  gulp.watch('demo-src/index.html', ['copy-index']);
  gulp.watch('demo-assets/**/*', ['copy-assets']);
  
  gulp.watch(['demo-build/index.html', 'demo-build/demo.js']).on('change', browserSync.reload);
});

gulp.task('launch-pages', ['vendor', 'dev', 'js', 'templates', 'copy-index', 'copy-assets'], function() {
  return gulp.src('demo-build/**/*', {
    base: 'demo-build'
  }).pipe(gulp.dest('./'));

});

gulp.task('js', ['templates'], function() {
  return gulp.src(['demo-src/app/main.js', 'demo-src/templates/templates.js', 'demo-src/app/**/*.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('demo.js'))
      .pipe(ngAnnotate())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('demo-build'));
});

gulp.task('vendor', function() {
  return gulp.src([
    'node_modules/angular/angular.js',
    'node_modules/@angular/router/angular1/angular_1_router.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('demo-build'));
})


gulp.task('templates', function() {
  return gulp.src('demo-src/app/**/*.html')
    .pipe(templateCache())
    .pipe(gulp.dest('demo-src/templates'));
});

gulp.task('copy-assets', function() {
  return gulp.src('demo-src/assets/**/*')
    .pipe(gulp.dest('demo-build/assets/'))
});

gulp.task('copy-index', function() {
  return gulp.src('demo-src/index.html')
    .pipe(gulp.dest('demo-build'));
})

gulp.task('dev', function() {
  return gulp.src('demo-src/style/demo.css')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(postcss([
      require('precss')({}),
      require('autoprefixer'),
      require('postcss-calc')({
        mediaQueries: true
      }),
      cssnext({
        compress: true,
        sourcemap: true
      })
    ]))
    .on('error', function(e){ console.log(e.message); this.emit('end'); })
    .pipe(sourcemaps.write('.'))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('demo-build'))
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


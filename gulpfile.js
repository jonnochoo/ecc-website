var gulp = require('gulp');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');

gulp.task('watch', function() {
  gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe(sass({ 
      errLogToConsole: true,
      includePaths: ['./bower_components/foundation/scss']
    }))
    .pipe(gulp.dest('public/css/'))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css/'));
});

gulp.task('dev', function () {
  nodemon({ script: 'app.js', ext: 'jade js', ignore: ['gulpfile.js'] })
    .on('start', ['watch'])
    .on('change', ['sass'])
    .on('restart', function () {
      console.log('restarted!')
    })
})
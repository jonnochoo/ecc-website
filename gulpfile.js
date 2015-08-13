var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var eslint = require('gulp-eslint');

gulp.task('default', ['nodemon', 'sass-watch'])

// SASS tasks
gulp.task('sass-watch', function() {
  gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe(sass({ 
      errLogToConsole: true,
      includePaths: ['./bower_components/foundation/scss']
    }))
    .pipe(gulp.dest('public/css/'))
    .pipe(notify('SASS recompiled'));
});

// gulp-nodemon
gulp.task('nodemon', function () {
  nodemon({ script: 'app.js', ext: 'js', ignore: ['gulpfile.js'] })    
    .on('restart', notify.onError({
      message: 'server has restarted'
    }))
})

gulp.task('lint', function () {
  return gulp.src(['**/*.js', '!**/public/js/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});
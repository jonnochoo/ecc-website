var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require("gulp-notify");
var sass = require('gulp-sass');
var watch = require('gulp-watch');

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
    .pipe(notify("SASS recompiled"));
});

// gulp-nodemon
gulp.task('nodemon', function () {
  nodemon({ script: 'app.js', ext: 'jade js', ignore: ['gulpfile.js'] })    
    .on('restart', notify.onError({
      message: 'server has restarted'
    }))
})
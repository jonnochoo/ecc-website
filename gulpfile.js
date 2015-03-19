var concat = require('gulp-concat');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

gulp.task('default', ['nodemon', 'watch'])

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe(sass({ 
      errLogToConsole: true,
      includePaths: ['./bower_components/foundation/scss']
    }))
    .pipe(gulp.dest('public/css/'));
});

gulp.task('nodemon', function () {
  nodemon({ script: 'app.js', ext: 'jade js', ignore: ['gulpfile.js'] })
    .on('restart', function () {
      console.log('restarted!')
    })
})

gulp.task('build', function(){
    return gulp.src(['public/js/*.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
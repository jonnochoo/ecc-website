var gulp = require('gulp');
var less = require('gulp-less');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');

gulp.task('default', function() {
  gulp.watch('public/stylesheets/*.less', ['less']);
});

gulp.task('less', function() {
  gulp.src('public/stylesheets/*.less')
    .pipe(less())
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('dev', function () {
  nodemon({ script: 'app.js', ext: 'jade js', ignore: ['gulpfile.js'] })
    .on('start', ['default'])
    .on('change', ['less'])
    .on('restart', function () {
      console.log('restarted!')
    })
})
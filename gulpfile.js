var gulp = require('gulp');
var headerfooter = require('gulp-headerfooter');

gulp.task('buildpages', function () {
	gulp.src('./pages/*/*.html')
		.pipe(headerfooter.header('./partials/header.html'))
        .pipe(gulp.dest('./public/'));
	gulp.src('./pages/*/*.css')
		.pipe(headerfooter.header('./partials/style.css'))
        .pipe(gulp.dest('./public/'));
});

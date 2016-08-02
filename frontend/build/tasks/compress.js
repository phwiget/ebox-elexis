var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');


gulp.task('compress', function (cb) {
    pump([
            gulp.src('dist/*.js'),
            uglify(),
            gulp.dest('dist')
        ],
        cb
    );
});
var gulp = require('gulp')
var postcss = require('gulp-postcss')

gulp.task('styles', () => {
    return gulp.src('src/**/*.css')
        .pipe(postcss())
        .pipe(gulp.dest('dist/client'))
})
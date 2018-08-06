const gulp = require('gulp');
const wrap = require('gulp-wrap');
const rename = require("gulp-rename");
const del = require('del');
const seq = require('gulp-sequence');
const vp = require('vinyl-paths');

function clean(path) {
  return del(path); // returns a promise
}

gulp.task('wrap', function () {
  return gulp.src('./dist/bundle.js')
    .pipe(wrap('<!-- --><script><%=contents%></script>'))
    .pipe(gulp.dest("./dist"));
});

gulp.task('rename', function () {
  return gulp.src("./dist/bundle.js")
    .pipe(vp(del))
    .pipe(rename('./bundle.html'))
    .pipe(gulp.dest("./dist"));
});

gulp.task('del', function () {
  console.log('del');
  return del(['./dist/bundle.js']);
});

gulp.task('default', seq('wrap', 'rename'));
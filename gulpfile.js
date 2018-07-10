const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('static', () =>{
    return gulp
        .src(['src/**/*.json'])
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts',  gulp.series('static', () => {
    const tsResult = tsProject.src()
        .pipe(tsProject());

    return tsResult.js
        .pipe(gulp.dest('dist'));
}));

gulp.task('build',  gulp.series('static', 'scripts'));

gulp.task('watch', gulp.series('build', () =>{
    return gulp.watch(['src/**/*.ts', 'src/**/*.json'], gulp.parallel('build'));
}));

gulp.task('default', gulp.series('watch'));





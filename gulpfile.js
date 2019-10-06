const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

// call TS compiler and add generated code in dist folder
function scripts() {
  const tsResult = tsProject.src().pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
}

// copy .json files from src to dist directory
function static() {
  return gulp.src(['src/**/*.json']).pipe(gulp.dest('dist'));
}

function cleanDist() {
  return gulp.src('dist').pipe(clean());
}

function watch() {
  return gulp.watch(
    ['src/**/*.ts', 'src/**/*.json'],
    gulp.series(static, scripts)
  );
}

const build = gulp.series(cleanDist, gulp.parallel(static, scripts), watch);

exports.default = build;

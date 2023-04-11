const {src, dest, watch, parallel, series} = require('gulp');

const scss         = require('gulp-sass')(require('sass'));
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
const browserSync  = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean        = require('gulp-clean');

function scripts() {
  return src([
    'app/js/**/*.js',
    '!app/js/main.min.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function styles() {
  return  src('app/scss/style.scss')
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version']}))
    .pipe(concat('style.min.scss'))
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function watching() {
  watch(['app/scss/style.scss'], styles)
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts)
  watch(['app/*.html']).on('change', browserSync.reload);
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
}

function cleanDist() {
  return src([
    'docs/css/*.min.css',
    'docs/js/*.min.js',
    'docs/**/*.html',
    'docs/**/*.webp',
    'docs/**/*.svg',
    'docs/**/*.png',
    'docs/**/*.jpg',
    'docs/**/*.ico',
    'docs/**/*.otf',
    'docs/**/*.ttf',
    'docs/**/*.woff',
    'docs/**/*.woff2',
    '!docs/git',
    '!docs/.gitignore',
  ])
    .pipe(clean())
}

function building() {
  return src([
    'app/css/style.min.css',
    'app/fonts/*.otf',
    'app/fonts/*.ttf',
    'app/fonts/*.woff',
    'app/fonts/*.woff2',
    'app/img/*.webp',
    'app/img/*.svg',
    'app/img/*.png',
    'app/img/*.jpg',
    'app/img/*.ico',
    'app/js/main.min.js',
    'app/**/*.html'
  ], {base : 'app'})
    .pipe(dest('docs'))
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.build = series(cleanDist, building);
exports.default = parallel(styles, scripts, browsersync, watching);
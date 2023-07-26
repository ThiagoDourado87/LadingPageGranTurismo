const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

// Tarefa para compilar e otimizar o CSS
gulp.task('styles', function () {
  return gulp
    .src('src/scss/styles.scss') // Caminho para o arquivo principal do SASS/SCSS
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css')); // Pasta de destino do CSS otimizado
});

// Tarefa para otimizar as imagens
gulp.task('images', function () {
  return gulp
    .src('src/img/*') // Caminho para as imagens do filme
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img')); // Pasta de destino das imagens otimizadas
});

// Tarefa para executar todas as tarefas
gulp.task('default', gulp.parallel('styles', 'images'));

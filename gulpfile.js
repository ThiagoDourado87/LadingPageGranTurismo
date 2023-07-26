const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');


// Tarefa para compilar os arquivos SCSS em CSS
gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream()); // Recarrega o navegador após a compilação
});

// Tarefa para iniciar o servidor do BrowserSync e assistir os arquivos
gulp.task('dev', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  // Assista os arquivos SCSS e recarregue o navegador quando houver alterações
  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));

  // Assista os arquivos HTML e recarregue o navegador quando houver alterações
  gulp.watch('*.html').on('change', browserSync.reload);
});

// Tarefa padrão (gulp) para compilar SCSS e iniciar o servidor de desenvolvimento
gulp.task('default', gulp.series('sass', 'dev'));
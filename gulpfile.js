var gulp         = require('gulp'),
	sass         = require('gulp-sass'),
	sourcemaps   = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS     = require('gulp-clean-css'),
	rename       = require('gulp-rename'),
	browserSync  = require('browser-sync').create(),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglify'),
	svg          = require('gulp-svg-sprite');

gulp.task('browser-sync', ['svgSpriteBuild', 'styles', 'scripts'], function() {
		browserSync.init({
				server: {
						baseDir: "./app"
				},
				notify: false
		});
});

gulp.task('styles', function () {
	return gulp.src('sass/*.sass')
	.pipe(sourcemaps.init())
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(cleanCSS())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src([
		'./app/libs/modernizr/modernizr.js',
		'./app/libs/jquery/jquery-1.11.2.min.js',
		'./app/libs/velocity/velocity.min.js',
		'./app/libs/swiper/swiper.min.js',
		'./app/libs/scrollMagic/ScrollMagic.min.js',
		'./app/libs/scrollMagic/animation.gsap.min.js',
		'./app/libs/greensock/TweenMax.min.js',
		'./app/libs/greensock/ScrollToPlugin.min.js',
		'./app/libs/greensock/CSSPlugin.min.js',
		'./app/libs/greensock/EaselPlugin.js',
		'./app/libs/parallax/rellax.min.js',
		'./app/libs/snap/classie.js',
		'./app/libs/svgdraw/jquery.drawsvg.js',
    './app/libs/detect/detect.min.js'
	])
	.pipe(concat('libs.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./app/js/'));
});

gulp.task('svgSpriteBuild', function() {
  return gulp.src('app/img/icons/*.svg')
  .pipe(svg({
	shape: {
	    spacing: {
	        padding: 10
	    }
	},
    mode: {
      css: {
        dest: '.',
        bust: false,
        sprite: '../img/sprite.svg',
        layout: 'vertical',
        prefix: '.',
        dimensions: true,
        render: {
          scss: {
            dest: '_sprite.scss'
          }
        }
      },
      symbol: false
    }
  }))
  .pipe(gulp.dest('sass/'));
});

gulp.task('watch', function () {
	gulp.watch('sass/*.sass', ['styles']);
	gulp.watch('app/libs/**/*.js', ['scripts']);
	gulp.watch('app/img/icons/*.svg', ['svgSpriteBuild']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
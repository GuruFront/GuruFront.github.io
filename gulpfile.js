var gulp 		= require('gulp'),
	sass 		= require('gulp-sass'),
	browserSync = require('browser-sync'),
	// concat 		= require("gulp-concat"),
	// cssnano 	= require("gulp-cssnano"),
	// rename 		= require("gulp-rename"),
	// uglify 		= require("gulp-uglifyjs"),
	// del 		= require('del'),
	// imagemin 	= require('gulp-imagemin'),
	// pngquant    = require("imagemin-pngquant"),
	pug 		= require('gulp-pug');


gulp.task("scss", function() {
	return gulp.src("src/assets/style/**/*.scss")
	.pipe(sass())
	.pipe(gulp.dest('src/assets/style'))
	.pipe(browserSync.reload({
		stream: true
	}))
});


gulp.task("pug", function() {
	return gulp.src("src/**/*.pug")
	.pipe(pug())
	.pipe(gulp.dest('src/'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false
	});
});


gulp.task("watch", ['browser-sync'], function() {
	gulp.watch('src/assets/style/**/*.scss', ['scss']);
	gulp.watch('src/**/*.pug', ['pug']);
	gulp.watch('src/js/**/*.js', browserSync.reload);
});

// gulp.task("build", ['clean', 'img', 'sass', 'scripts'], function() {

// 	var buildCss = gulp.src([
// 		'app/css/main.css',
// 		'app/css/libs.min.css'
// 		])
// 	.pipe(gulp.dest('dist/css'));

// 	var buildFonts = gulp.src('src/fonts/**/*')
// 		.pipe(gulp.dest('dist/fonts'));

// 	var buildJs = gulp.src('src/js**/*')
// 		.pipe(gulp.dest("dist/js"));

// 	var buildHtml = gulp.src('src/*.html')
// 		.pipe(gulp.dest('dist'));
// });



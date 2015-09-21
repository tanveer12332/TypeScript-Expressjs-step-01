var gulp = require('gulp');
var ts = require('gulp-typescript');
var rimraf = require('gulp-rimraf');
var nodemon = require('gulp-nodemon');


gulp.task('cleanBuildDir', function(){
	return gulp.src('built').pipe(rimraf());
});

gulp.task('buildServer', function(){
	var tsResult= gulp.src('src/**/*.ts')
	.pipe(ts({
		module: 'CommonJS'
	}));
	return tsResult.js.pipe(gulp.dest('built/'));
});

gulp.task('nodemon',['buildServer', 'watch'], function(){
nodemon({
	 script: './built/server.js'	
}).on('restart', function(){
console.log('nodemon 1 restarted server.js');	
})
});
gulp.task('watch', function(){
gulp.watch('src/**/*.ts', ['buildServer']);	
});
gulp.task('default',['buildServer']);
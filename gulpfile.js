
'use strict';

require('babel-core/register');

/*===============================
=            Loaders            =
===============================*/
var gulp            = require('gulp');
var jshint          = require('gulp-jshint');
var compass         = require('gulp-compass');
var livereload      = require('gulp-livereload');
var spawn           = require('child_process').spawn;
var jasmineBrowser  = require('gulp-jasmine-browser');
var node;

/*=====  End of Loaders  ======*/


/*==================================
=            References            =
==================================*/
var files = ['./server.js', './dev/api/**/*.js', './dev/app/**/*.js', '!./dev/app/js/**/*.js'];
var sassFiles = ['./dev/sass/**/*.scss'];
var css = './dev/css';
var specs = [
    './dev/bower_components/socket.io-client/socket.io.js',
    './dev/bower_components/angular/angular.min.js',
    './dev/bower_components/angular-route/angular-route.min.js',
    './dev/bower_components/angular-resource/angular-resource.min.js',
    './dev/bower_components/angular-socket-io/socket.min.js',
    './dev/bower_components/angular-animate/angular-animate.min.js',
    './dev/bower_components/angular-mocks/angular-mocks.js',
    './dev/app/app.js',
    './dev/app/controllers/*.js',
    './tests/**/*-specs.js'
];

/*=====  End of References  ======*/

/*======================================
=            Register tasks            =
======================================*/

gulp.task('hint', function () {
    return gulp.src(files)
        .pipe(jshint({esnext: true, node: true }))
        .pipe(jshint.reporter('default'));
});

gulp.task('specs', function () {
    return gulp.src(specs)
        .pipe(jasmineBrowser.specRunner({console: true}))
        .pipe(jasmineBrowser.headless());
});

gulp.task('server', function () {
    if (node) {
        node.kill();
    }

    node = spawn('node', ['--harmony', 'server.js'], {stdio: 'inherit'});
    node.on('close', function (code) {

        if (code === 8) {
            console.log('Error detected, waiting for changes...');
        }
    });
});

/*=====  End of Register tasks  ======*/

/*====================================
=            Config tasks            =
====================================*/

gulp.task('files', function () {
    return gulp.src(files).pipe(livereload());
});

gulp.task('compass', function () {
    return gulp.src(sassFiles)
        .pipe(compass({
            sass: './dev/sass',
			css: './dev/css',
        }));
});

gulp.task('api', ['hint', 'specs', 'compass', 'server'], function () {

    livereload.listen();

    gulp.watch(files, ['hint', 'specs', 'server', 'files']);
    gulp.watch(sassFiles, ['compass']);
    gulp.watch(specs, ['specs']);
});

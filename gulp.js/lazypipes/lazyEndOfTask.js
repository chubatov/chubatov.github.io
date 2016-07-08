'use strict';

var Gulp = require('gulp');
var GulpUtil = require('gulp-util');
var GulpSize = require('gulp-size');
var Lazypipe = require('lazypipe');

var lazyEndOfTask = function (dest_path, message) {
    if (!dest_path || !message) {
        return function () {
            var error = 'lazyEndOfTask: All parameters are required!';
            GulpUtil.log(GulpUtil.colors.red(error.toString()));
            return false;
        };
    }

    return Lazypipe()
        .pipe(Gulp.dest, dest_path)
        .pipe(GulpSize, { title: message });
};

module.exports = lazyEndOfTask;

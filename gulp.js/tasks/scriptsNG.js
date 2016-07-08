'use strict';

var config = require('../config');

var Gulp = require('gulp');
var GulpJShint = require('gulp-jshint');
var GulpConcat = require('gulp-concat');
var GulpRename = require('gulp-rename');
var GulpNgAnnotate = require('gulp-ng-annotate');
var GulpUglify = require('gulp-uglify');
var Del = require('del');

var getRandomValue = require('../helpers/getRandomValue');
var lazyEndOfTask = require('../lazypipes/lazyEndOfTask');
var handleError = require('../handlers/handleError');
var handleDelete = require('../handlers/handleDelete');


var scriptsNG = {
    compile: function () {
        return Gulp
            .src(config.angular._src)
            .pipe(GulpJShint({ 'predef': [ 'angular' ] }))
            .pipe(GulpJShint.reporter('default'))
            .pipe(GulpConcat(config.angular._file_name))
            .pipe(GulpRename({ 'prefix': getRandomValue(false) }))
            .pipe(GulpNgAnnotate({
                'remove': true,
                'add': true
            }).on('error', handleError))
            .pipe(GulpUglify().on('error', handleError))
            .pipe(lazyEndOfTask(
                config.angular._dest[0],
                'size of file ' + config.angular._file_name + ': '
            )());
    },

    del: function () {
        Del(config.angular._del, handleDelete);
    }
};

module.exports = scriptsNG;

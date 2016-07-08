'use strict';

var config = require('../config');

var Gulp = require('gulp');
var GulpJShint = require('gulp-jshint');
var GulpConcat = require('gulp-concat');
var GulpRename = require('gulp-rename');
var GulpUglify = require('gulp-uglify');
var Del = require('del');

var getRandomValue = require('../helpers/getRandomValue');
var lazyEndOfTask = require('../lazypipes/lazyEndOfTask');
var handleError = require('../handlers/handleError');
var handleDelete = require('../handlers/handleDelete');

var scriptsJS = {
    compile: function () {
        return Gulp
            .src(config.scripts._src)
            .pipe(GulpJShint({ 'predef': [ 'jQuery' ] }))
            .pipe(GulpJShint.reporter('default'))
            .pipe(GulpConcat(config.scripts._file_name))
            .pipe(GulpRename({ 'prefix': getRandomValue(false) }))
            .pipe(GulpUglify().on('error', handleError))
            .pipe(lazyEndOfTask(
                config.scripts._dest[0],
                'size of file ' + config.scripts._file_name + ': '
            )());
    },

    del: function () {
        Del(config.scripts._del, handleDelete);
    }
};

module.exports = scriptsJS;

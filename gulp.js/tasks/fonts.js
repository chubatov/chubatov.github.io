'use strict';

var config = require('../config');

var Gulp = require('gulp');
var GulpFlatten = require('gulp-flatten');
var Del = require('del');

var lazyEndOfTask = require('../lazypipes/lazyEndOfTask');
var handleDelete = require('../handlers/handleDelete');


var fonts = {
    compile: function  () {
        return Gulp
            .src(config.fonts._src)
            .pipe(GulpFlatten())
            .pipe(lazyEndOfTask(
                config.fonts._dest[0],
                'size of font files: '
            )());
    },

    del: function () {
        Del(config.fonts._del, handleDelete);
    }
};

module.exports = fonts;

'use strict';

var config = require('../config');

var Gulp = require('gulp');
var GulpImagemin = require('gulp-imagemin');
var Del = require('del');

var lazyEndOfTask = require('../lazypipes/lazyEndOfTask');
var handleDelete = require('../handlers/handleDelete');
var handleError = require('../handlers/handleError');


var images = {
    compile: function () {
        return Gulp
            .src(config.images._src)
            .pipe(GulpImagemin().on('error', handleError))
            .pipe(lazyEndOfTask(
                config.images._dest[0],
                'size of images: '
            )());
    },

    del: function () {
        Del(config.images._del, handleDelete);
    }
};

module.exports = images;

'use strict';

var config = require('../config');

var Gulp = require('gulp');
var GulpIfElse = require('gulp-if-else');
var GulpFilter = require('gulp-filter');
var Del = require('del');

var isDev = require('../helpers/isDev');
var handleDelete = require('../handlers/handleDelete');
var lazyMinifyHTML = require('../lazypipes/lazyMinifyHTML');
var lazyEndOfTask = require('../lazypipes/lazyEndOfTask');


var templatesHTML = {
    compile: function () {
        var filter = GulpFilter(config.templatesHTML._filter, {restore: true});

        return Gulp
            .src(config.templatesHTML._src)
            .pipe(filter)
                .pipe(GulpIfElse(!isDev(), lazyMinifyHTML(true)))
            .pipe(filter.restore)
            .pipe(lazyEndOfTask(
                config.templatesHTML._dest[0],
                'size of templates HTML/TXT files: '
            )());
    },

    del: function () {
        Del(config.templatesHTML._del, handleDelete);
    }
};

module.exports = templatesHTML;

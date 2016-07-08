'use strict';

var config = require('../config');

var Gulp = require('gulp');
var GulpIfElse = require('gulp-if-else');
var GulpAngularTemplateCache = require('gulp-angular-templatecache');
var Del = require('del');

var isDev = require('../helpers/isDev');
var handleError = require('../handlers/handleError');
var handleDelete = require('../handlers/handleDelete');
var lazyEndOfTask = require('../lazypipes/lazyEndOfTask');
var lazyMinifyHTML = require('../lazypipes/lazyMinifyHTML');


var templatesCache = {
    compile: function () {
        return Gulp
            .src(config.templatesCache._src)
            .pipe(GulpIfElse(!isDev(), lazyMinifyHTML(false)))
            .pipe(GulpAngularTemplateCache(config.templatesCache._file_name, {
                root: config.templatesCache._root,
                module: config.templatesCache._module_name,
                standalone: config.templatesCache._standalone
            }).on('error', handleError))
            .pipe(lazyEndOfTask(
                config.templatesCache._dest[0],
                'size of file ' + config.templatesCache._file_name + ': '
            )());
    },

    del: function () {
        Del(config.templatesCache._del, handleDelete);
    }
};

module.exports = templatesCache;

'use strict';

var config = require('../config');

var Gulp = require('gulp');
var GulpFilter = require('gulp-filter');
var GulpUglify = require('gulp-uglify');
var GulpReplace = require('gulp-replace');
var GulpConcat = require('gulp-concat');
var GulpRename = require('gulp-rename');
var Del = require('del');

var getRandomValue = require('../helpers/getRandomValue');
var lazyEndOfTask = require('../lazypipes/lazyEndOfTask');
var handleError = require('../handlers/handleError');
var handleDelete = require('../handlers/handleDelete');


var scriptsBower = {
    compile: function () {
        var filter = GulpFilter(config.bowerComponents._filter, { restore: true });

        return Gulp.src(config.bowerComponents._src)
            .pipe(filter)
                // Preserve comments that start with a bang (!) or
                // include a Closure Compiler directive (@preserve, @license, @cc_on)
                .pipe(GulpUglify({
                    preserveComments: 'some'
                }).on('error', handleError))
            .pipe(filter.restore)
            // remove all links to source map
            // \/\/\#\ssourceMappingURL=[A-z, \-, \.]*
            // \/\/\#\s(sourceMappingURL=)[\w, \-, \.]*
            // Here was a link to sourceMap
            .pipe(GulpReplace(/\/\/\#\s(sourceMappingURL=)[\w, \-, \.]*/g, '').on('error', handleError))
            .pipe(GulpConcat(config.bowerComponents._file_name))
            .pipe(GulpRename({ 'prefix': getRandomValue(false) }))
            .pipe(lazyEndOfTask(
                config.bowerComponents._dest[0],
                'size of file ' + config.bowerComponents._file_name + ': '
            )());
    },

    del: function () {
        Del(config.bowerComponents._del, handleDelete);
    }
};

module.exports = scriptsBower;

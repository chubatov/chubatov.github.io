'use strict';

var config = require('../config');

var Gulp = require('gulp');
var GulpStylus = require('gulp-stylus');
var Jeet = require('jeet');
var Rupture = require('rupture');
var GulpCSSMin = require('gulp-cssmin');
var GulpAutoprefixer = require('gulp-autoprefixer');
var GulpSourcemaps = require('gulp-sourcemaps');
var GulpRename = require('gulp-rename');
var GulpReplace = require('gulp-replace');
var GulpIfElse = require('gulp-if-else');
var Del = require('del');

var isDev = require('../helpers/isDev');
var getRandomValue = require('../helpers/getRandomValue');
var handleDelete = require('../handlers/handleDelete');
var handleError = require('../handlers/handleError');
var lazyEndOfTask = require('../lazypipes/lazyEndOfTask');


var styles = {
    compile: function () {
        return Gulp
            .src(config.styles._src[0])
            .pipe(GulpRename({ 'suffix': '.min' }))
            .pipe(GulpIfElse(isDev(), function () {
                // true (isDev)
                return GulpSourcemaps.init();
            }, function () {
                // false
                return GulpRename({ 'prefix': getRandomValue(false) });
            }))
            .pipe(GulpStylus({
                use: [Jeet(), Rupture()],
                'include css': true
            }).on('error', handleError))
            .pipe(GulpAutoprefixer({
                browsers: ['last 2 versions'],
                cascade: false,
                remove: true
            }))
            .pipe(GulpReplace('ui-grid.','../fonts/ui-grid.'))  // eot, ttf, svg, woff
            .pipe(GulpIfElse(isDev(), function () {
                // true (isDev)
                return GulpSourcemaps.write('.');
            }, function () {
                // false
                return GulpCSSMin({ processImport: false }).on('error', handleError);
            }))
            .pipe(lazyEndOfTask(
                config.styles._dest[0],
                'size of file ' + config.styles._file_name + ': '
            )());
    },

    del: function () {
        Del(config.styles._del, handleDelete);
    }
};

module.exports = styles;

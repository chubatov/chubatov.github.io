'use strict';

var config = require('../config');

var Gulp = require('gulp');
var GulpNgDocs = require('gulp-ngdocs');
var Del = require('del');

var lazyEndOfTask = require('../lazypipes/lazyEndOfTask');
var handleError = require('../handlers/handleError');
var handleDelete = require('../handlers/handleDelete');


var scriptsDoc = {
    compile: function () {
        var options = {
            startPage: '/api/bettor',
            title: 'Front-End documentation',
            image: '../images/bettor_docs_logo.png',
            imageLink: '//bettor.com'
        };

        return Gulp.src(config.documentation._src)
            .pipe(GulpNgDocs.process(options).on('error', handleError))
            .pipe(lazyEndOfTask(
                config.documentation._dest[0],
                'size of documentation files: '
            )());
    },

    del: function () {
        Del(config.documentation._del, handleDelete);
    }
};

module.exports = scriptsDoc;

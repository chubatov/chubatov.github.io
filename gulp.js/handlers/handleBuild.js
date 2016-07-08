'use strict';

var config = require('../config');

var Gulp = require('gulp');

var Ggit = require('ggit');
var GulpInject = require('gulp-inject');
var GulpInsert = require('gulp-insert');

var lazyEndOfTask = require('../lazypipes/lazyEndOfTask');
var lazyMinifyHTML = require('../lazypipes/lazyMinifyHTML');
var handleError = require('./handleError');

var injectTransformHandler = require('../helpers/injectTransformHandler');
var injectTransformHandlerJS = injectTransformHandler.JS;
var injectTransformHandlerCSS = injectTransformHandler.CSS;


var handleBuild = function (bowerComponents_src, scripts_src, angular_src) {
    var lastCommitId = Ggit.lastCommitId;

    return lastCommitId()
        .then(function (hash_str_id) {
            return Gulp.src(config.templatesHTML._base_html_path)
                .pipe(GulpInject(Gulp.src(config.styles._build_src), {
                    read: false,
                    starttag: '<!-- inject:head:{{ext}} -->',
                    addRootSlash: true,
                    addPrefix: '',
                    transform: injectTransformHandlerCSS
                }))
                .pipe(GulpInject(Gulp.src(bowerComponents_src), {
                    read: false,
                    starttag: '<!-- inject:bower:{{ext}} -->',
                    addRootSlash: true,
                    addPrefix: '',
                    transform: injectTransformHandlerJS
                }))
                .pipe(GulpInject(Gulp.src(scripts_src), {
                    read: false,
                    starttag: '<!-- inject:scripts:{{ext}} -->',
                    addRootSlash: true,
                    addPrefix: '',
                    transform: injectTransformHandlerJS
                }))
                .pipe(GulpInject(Gulp.src(angular_src), {
                    read: false,
                    starttag: '<!-- inject:angular:{{ext}} -->',
                    addRootSlash: true,
                    addPrefix: '',
                    transform: injectTransformHandlerJS
                }))
                .pipe(lazyMinifyHTML(true)())
                // git log --pretty=format:'%H' -n 1
                .pipe(GulpInsert.append('<!-- ' + hash_str_id + ' -->').on('error', handleError))
                .pipe(lazyEndOfTask(
                    config.templatesHTML._dest[0],
                    'size of base.html: '
                )());
        });
}

module.exports = handleBuild;

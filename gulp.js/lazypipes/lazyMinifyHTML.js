'use strict';

var Gulp = require('gulp');
var Lazypipe = require('lazypipe');
var GulpMinifyHTML = require('gulp-minify-html');
var GulpIfElse = require('gulp-if-else');
var GulpMinifyInline = require('gulp-minify-inline');

var lazyMinifyHTML = function (is_GulpMinifyInline) {
    return Lazypipe()
        .pipe(GulpMinifyHTML, {
            empty: true,            // do not remove empty attributes
            cdata: true,            // do not strip CDATA from scripts
            comments: false,        // do not remove comments
            conditionals: true,     // do not remove conditional internet explorer comments
            spare: true,            // do not remove redundant attributes
            quotes: true,           // do not remove arbitrary quotes
            loose: false            // preserve one whitespace
        })//.on('error', handleError)
        .pipe(function () {
            return GulpIfElse(is_GulpMinifyInline, function () {
                // true (is_GulpMinifyInline)
                return GulpMinifyInline({
                    /*
                        https://github.com/mishoo/UglifyJS2
                        quote_style:
                        0 -- prefers double quotes, switches to single quotes when there are more double quotes in the string itself.
                        1 -- always use single quotes
                        2 -- always use double quotes
                        3 -- always use the original quotes
                    */
                    js: { output: { comments: false, quote_style: 3 } },
                    jsSelector: 'script[data-parse-inline="yes"]',
                    css: { keepSpecialComments: 1 }
                })//.on('error', handleError)
            });
        });
};

module.exports = lazyMinifyHTML;

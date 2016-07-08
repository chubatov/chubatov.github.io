'use strict';

var config = require('../config');

var Gulp = require('gulp');
var GulpUtil = require('gulp-util');
var Del = require('del');
var GulpRealFavicon = require ('gulp-real-favicon');
var fs = require('fs');

var lazyEndOfTask = require('../lazypipes/lazyEndOfTask');
var handleDelete = require('../handlers/handleDelete');


var favicons = {
    // File where the favicon markups are stored
    _FAVICON_DATA_FILE: 'faviconData.json',
    compile: function () {
        GulpRealFavicon.generateFavicon({
            masterPicture: config.favicons._src[0],
            dest: config.favicons._dest[0],
            iconsPath: '/static/app/images',
            design: {
                ios: {
                    pictureAspect: 'noChange'
                },
                desktopBrowser: {},
                windows: {
                    pictureAspect: 'noChange',
                    backgroundColor: '#f8a101',
                    onConflict: 'override'
                },
                androidChrome: {
                    pictureAspect: 'noChange',
                    themeColor: '#106494',
                    manifest: {
                        name: 'bettor.com',
                        display: 'browser',
                        orientation: 'notSet',
                        onConflict: 'override',
                        declared: true
                    }
                },
                safariPinnedTab: {
                    pictureAspect: 'blackAndWhite',
                    threshold: 66.40625,
                    themeColor: '#106494'
                }
            },
            settings: {
                compression: 3,
                scalingAlgorithm: 'Mitchell',
                errorOnImageTooSmall: false
            },
            markupFile: favicons._FAVICON_DATA_FILE
        }, function () { // success callback
            var message = [
                GulpUtil.colors.white("Finished '"),
                GulpUtil.colors.cyan("b.favicons:compile"),
                GulpUtil.colors.white("'...")
            ];
            GulpUtil.log(message.join(''));
        });
    },
    del: function () {
        Del(config.fonts._del, handleDelete);
    },

    // Inject the favicon markups in your HTML pages. You should run
    // this task whenever you modify a page. You can keep this task
    // as is or refactor your existing HTML pipeline.
    injectFaviconMarkups: function () {
        Gulp.src([ 'TODO: List of the HTML files where to inject favicon markups' ])
            .pipe(GulpRealFavicon.injectFaviconMarkups(
                JSON.parse(fs.readFileSync(favicons._FAVICON_DATA_FILE)).favicon.html_code))
            .pipe(Gulp.dest('TODO: Path to the directory where to store the HTML files'));
    },

    // Check for updates on RealFaviconGenerator (think: Apple has just
    // released a new Touch icon along with the latest version of iOS).
    // Run this task from time to time. Ideally, make it part of your
    // continuous integration system.
    heckForFaviconUpdate: function (done) {
        var currentVersion = JSON.parse(fs.readFileSync(favicons._FAVICON_DATA_FILE)).version;
        GulpRealFavicon.checkForUpdates(currentVersion, function(err) {
            if (err) {
                throw err;
            }
        });
    }
};

module.exports = favicons;

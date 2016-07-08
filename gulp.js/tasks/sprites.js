'use strict';

var config = require('../config');

var Gulp = require('gulp');
var GulpSpritesmith = require('gulp.spritesmith');
var GulpImagemin = require('gulp-imagemin');
var MergeStream = require('merge-stream');
var Del = require('del');

var lazyEndOfTask = require('../lazypipes/lazyEndOfTask');
var handleDelete = require('../handlers/handleDelete');


var sprites = {
    compile: function () {
        // Generate our spritesheet
        var spriteData = Gulp.src(config.sprites._src).pipe(GulpSpritesmith({
            imgName: config.sprites._img_name,
            imgPath: config.sprites._path_to_img[0] + config.sprites._img_name,
            cssName: config.sprites._css_name
        }));

        // Pipe image stream through image optimizer and onto disk
        var imgStream = spriteData.img
            .pipe(GulpImagemin())
            .pipe(lazyEndOfTask(
                config.sprites._dest[0],
                'size of file ' + config.sprites._img_name + ': '
            )());

        // Pipe CSS stream and onto disk
        var cssStream = spriteData.css
            .pipe(lazyEndOfTask(
                config.sprites._dest[1],
                'size of file ' + config.sprites._css_name + ': '
            )());

        // Return a merged stream to handle both `end` events
        return MergeStream(imgStream, cssStream);
    },

    del: function () {
        Del(config.sprites._del, handleDelete);
    }
};

module.exports = sprites;

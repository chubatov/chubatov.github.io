'use strict';

var Gulp = require('gulp');
var config = require('./gulp.js/config'); // ======= CONFIG (start dir: static/)
var _handleBuild = require('./gulp.js/handlers/handleBuild');


// ======= FONTS
var _fonts = require('./gulp.js/tasks/fonts');
Gulp.task('b.fonts:compile', ['b.fonts:del'], _fonts.compile);
Gulp.task('b.fonts:del', _fonts.del);

// ======= IMAGES
var _images = require('./gulp.js/tasks/images');
Gulp.task('b.images:compile', ['b.images:del'/*, 'b.sprites:compile'*/], _images.compile);
Gulp.task('b.images:del', _images.del);

// ======= STYLES
var _styles = require('./gulp.js/tasks/styles');
Gulp.task('b.styles:compile', ['b.styles:del','b.fonts:compile','b.images:compile'], _styles.compile);
Gulp.task('b.styles:del', _styles.del);

// ======= TEMPLATES HTML
var _templatesHTML = require('./gulp.js/tasks/templatesHTML');
Gulp.task('b.templates.html:compile', ['b.templates.html:del'], _templatesHTML.compile);
Gulp.task('b.templates.html:del', _templatesHTML.del);

// ======= SCRIPTS
var _scriptsJS = require('./gulp.js/tasks/scriptsJS');
Gulp.task('b.scripts.js:compile', ['b.scripts.js:del'], _scriptsJS.compile);
Gulp.task('b.scripts.js:del', _scriptsJS.del);

//========== SCRIPTS VENDOR
var _scriptsBower = require('./gulp.js/tasks/scriptsBower');
Gulp.task('b.scripts.bower:compile', ['b.scripts.bower:del'], _scriptsBower.compile);
Gulp.task('b.scripts.bower:del', _scriptsBower.del);


// ======= BUILD
Gulp.task('b.all:build:dev', [
        'b.styles:compile', // include `b.fonts:compile` and `b.images:compile` (include `b.sprites:compile`).
        'b.templates.html:compile',
        'b.templates.cache:compile'
    ], function () {
        // bower files, js files and angular files uses from static_develop folder
        return _handleBuild(config.bowerComponents._src, config.scripts._src, config.angular._src);
    });

Gulp.task('b.all:build:compile', [
        'b.styles:compile', // include `b.fonts:compile` and `b.images:compile` (include `b.sprites:compile`).
        'b.templates.html:compile',
        'b.scripts.bower:compile',
        'b.scripts.js:compile',
        'b.scripts.ng:compile' // includes `b.templates.cache:compile`
    ], function () {
        return _handleBuild(config.bowerComponents._build_src, config.scripts._build_src, config.angular._build_src);
    });


// ======= WATCH
var _watchers = require('./gulp.js/tasks/watchers');
Gulp.task('b.ngDoc:watch', function () { return _watchers.ngDocumentation(['b.ngDoc:compile']); });
Gulp.task('b.allBuildDev:watch', function () { return _watchers.allBuild(['b.all:build:dev']); });


// ======= RUN TASKS
// gulp dev        => `npm run dev`
// gulp build      => `npm run build`
// gulp build.doc  => `npm run doc`
Gulp.task('dev', [
    'b.all:build:dev',
    'b.favicons:compile',
    'b.allBuildDev:watch',
    'b.ngDoc:del'
]);
Gulp.task('prod', [
    'b.all:build:compile',
    'b.favicons:compile',
    'b.ngDoc:del'
]);

Gulp.task('default', ['prod']);

'use strict';

var config = require('../config');

var Gulp = require('gulp');
var GulpUtil = require('gulp-util');

var isArray = require('../helpers/isArray');
var handleChange = require('../handlers/handleChange');


/* http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc: */
/* echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p */
var watchers = {
    ngDocumentation: function (tasksNameList) {
        if (!tasksNameList || !isArray(tasksNameList)) {
            var error = 'wathers.ngDocumentation: All parameters are required!';
            GulpUtil.log(GulpUtil.colors.red(error.toString()));
            return false;
        }
        // var GulpNgDocsWatcher = Gulp.watch(config.documentation._src, ['bettor.ngDocumentation:compile']);

        var GulpNgDocsWatcher = Gulp.watch(config.documentation._src, tasksNameList);
        GulpNgDocsWatcher.on('change', handleChange);
    },

    allBuild: function (tasksNameList) {
        if (!tasksNameList || !isArray(tasksNameList)) {
            var error = 'wathers.allBuild: All parameters are required!';
            GulpUtil.log(GulpUtil.colors.red(error.toString()));
            return false;
        }

        // this order has sense
        var all_src = [].concat(
            config.styles._src[1],
            config.templatesHTML._src,
            config.templatesCache._src,
            config.scripts._src,          // if new file has been added, we need it add to base.html
            config.angular._src,          // if new file has been added, we need it add to base.html`
            config.bowerComponents._src,  // if new file has been added, we need it add to base.html
            '!' + config.templatesCache._del[0]
        );

        // var builWatcher = Gulp.watch(all_src, ['bettor.all:build:dev']);
        var builWatcher = Gulp.watch(all_src, tasksNameList);
        builWatcher.on('change', handleChange);
    }
};

module.exports = watchers;

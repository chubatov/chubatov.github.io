'use strict';

var GulpUtil = require('gulp-util');

var handleChange = function (event) {
    GulpUtil.log(GulpUtil.colors.blue('File ' + event.path + ' was ' + event.type + ', running task ...'));
};

module.exports = handleChange;

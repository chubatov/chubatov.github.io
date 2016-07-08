'use strict';

var GulpUtil = require('gulp-util');

var handleError = function (error) {
    GulpUtil.log(GulpUtil.colors.red(error.toString()));
    if (this && typeof this.emit === 'function') this.emit('end');
};

module.exports = handleError;

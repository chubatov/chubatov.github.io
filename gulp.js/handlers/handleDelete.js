'use strict';

var GulpUtil = require('gulp-util');
var handleError = require('./handleError');

var isDev = require('../helpers/isDev');

var handleDelete = function (error, deletedFiles) {
    if (error) handleError(error);
    if (isDev()) GulpUtil.log(GulpUtil.colors.yellow('Files deleted: ', deletedFiles.join(', ')));
}

module.exports = handleDelete;

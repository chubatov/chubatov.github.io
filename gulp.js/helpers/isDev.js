'use strict';

var isDev = function () {
    return process.env.NODE_ENV === 'dev';
};

module.exports = isDev;

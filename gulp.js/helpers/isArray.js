'use strict';

var isArray = function (array) {
    return Object.prototype.toString.call(array).substring(8, 13) === 'Array';
};

module.exports = isArray;

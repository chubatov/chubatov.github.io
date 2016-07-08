'use strict';

var getRandomValue = function (is_Dev) {
    var timestamp = (new Date()).getTime();
    if (is_Dev) return '?v=' + timestamp;
    return 't' + timestamp + '_';
};

module.exports = getRandomValue;

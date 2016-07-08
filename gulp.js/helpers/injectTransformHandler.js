'use strict';

var isDev = require('./isDev');
var getRandomValue = require('./getRandomValue');

var injectTransformHandler = {
    JS: function (filepath) {
        var script_start = "<script type=\"text/javascript\" data-parse-inline=\"no\" src=\"";
        var script_end = "\"></script>";
        var file_path = filepath.replace('static_develop', 'static');

        if (isDev()) {
            return script_start + file_path + getRandomValue(isDev()) + script_end;
        } else {
            return script_start + file_path + script_end;
        }

        return inject.transform.apply(inject.transform, arguments); // Use the default transform as fallback:
    },
    CSS: function (filepath) {
        var link_start = "<link rel=\"stylesheet\" href=\"";
        var link_end = "\">";
        var file_path = filepath;

        if (isDev()) {
            return link_start + file_path + getRandomValue(isDev()) + link_end;
        } else {
            return link_start + file_path + link_end;
        }

        return inject.transform.apply(inject.transform, arguments); // Use the default transform as fallback:
    }
};

module.exports = injectTransformHandler;

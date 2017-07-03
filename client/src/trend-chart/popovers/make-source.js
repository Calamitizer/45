(function() {
    'use strict';

    const makeTime = require('./make-time.js');

    var makeSource = function(props) {
        var source = {
            name: props.name,
            org: props.org,
            time: makeTime(props.ms),
            url: props.url,
        };

        return source;
    };

    module.exports = makeSource;

}());

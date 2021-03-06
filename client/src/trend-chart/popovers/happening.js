(function() {
    'use strict';

    const uuid = require('uuid');

    const makeSource = require('./make-source.js');

    var makeHappening = function(props) {
        var happening = {
            name: props.name,
            date: props.date,
            sources: props.sources,
            id: uuid(),
        };

        return happening;
    };

    module.exports = makeHappening;

}());

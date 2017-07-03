(function() {
    'use strict';

    const uuid = require('uuid');

    const makeSource = require('./make-source.js');

    var happening = function(props) {
        return {
            name: props.name,
            date: props.date,
            sources: props.sources,
            id: uuid();
        };

    module.exports = Happening;

}());

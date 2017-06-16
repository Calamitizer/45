(function() {
    'use strict';

    var path = require('path');

    module.exports = {
        entry: path.join(__dirname, 'client', 'src', 'entry.js'),
        output: {
            filename: 'bundle.js',
            path: path.join(__dirname, 'client', 'www'),
        },
    };

}());

(function() {
    'use strict';

    var path = require('path');

    module.exports = {
        context: __dirname,
        entry: path.join(__dirname, 'client', 'src', 'entry.js'),
        output: {
            path: path.join(__dirname, 'client', 'www'),
            filename: 'bundle.js',
        },
        watch: true,
    };

}());

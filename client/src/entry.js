(function() {
    'use strict';

    var d3 = require('d3');
    var googleTrends = require('google-trends-api');

    console.log('Entry.js running');

    d3
        .select('body')
        .append('p')
        .text('I\'m dynamically generated!');
}());

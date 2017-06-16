(function() {
    'use strict';

    var d3 = require('d3');
    var googleTrends = require('google-trends-api');


    d3
        .select('body')
        .append('p')
        .text('I\'m dynamically generated!');
}());

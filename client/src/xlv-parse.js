(function() {
    'use strict';

    const d3 = require('d3');

    var capitalize = function(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    var kwA2S = function(kwArray) {
        return kwArray.join('&');
    };

    var kwS2A= function(kwString) {
        return kwString.split('&');
    };

    var resolutions = (function() {
        var durations = {
            ms: 1,
            s: 1000,
            m: 1000 * 60,
            h: 1000 * 60 * 60,
            d: 1000 * 60 * 60 * 24,
            y: 1000 * 60 * 60 * 24 * 365,
        };

        return [
            {
                name: 'minute',
                threshold: 0,
                format: '%-I:%S %p',
            },
            {
                name: 'hour',
                threshold: 3 * durations.h,
                format: '%-I %p',
            },
            {
                name: 'day',
                threshold: 3 * durations.d,
                format: '%-b. %d',
            },
            {
                name: 'month',
                threshold: 3 * durations.m,
                format: '%-b. %Y',
            },
            {
                name: 'year',
                threshold: 3 * durations.y,
                format: '%Y',
            },
        ];

    }());

    var pickFormat = function(diff) {
        var format = '';
        resolutions.forEach(res => {
            console.log(diff);
            console.log(res);
            console.log(res.threshold);
            if (diff >= res.threshold) {
                format = res.format;
            }
        });
        return format;
    };

    var getFormatter = function(scale) {
        var domain = scale.domain();
        var difference = Math.abs(domain[1] - domain[0]) // in ms
        var format = pickFormat(difference);
        var formatter = d3.timeFormat(format);

        return formatter;
    };

    var xlvParse = {
        capitalize,
        kwA2S,
        kwS2A,
        getFormatter,
    };

    module.exports = xlvParse;

}());

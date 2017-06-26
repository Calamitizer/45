(function() {
    'use strict'

    var express = require('express');

    var trendByTime = require('../methods/fetch-trend-by-time.js');

    var defaultChar = 'x';

    var apiRouter = express.Router();

    var apiRE = (function() {
        var indexRE = 'by(time)';
        var keywordRE = '(\\w+)';
        var timestampRE = [
            '(',
            '\\d{10}',
            '|',
            defaultChar,
            ')',
        ].join('');
        var maybeSlash = '(?:\\/)?';

        var re = new RegExp([
            '^\\/',
            [
                indexRE,
                keywordRE,
                timestampRE,
                timestampRE,
            ].join('\\/'),
            maybeSlash,
            '$',
        ].join(''));

        return re;
    }());

    var parseTimes = function(start, stop) {
        var times = {};

        if (start !== defaultChar) {
            times.start = start;
        }

        if (stop !== defaultChar) {
            times.stop = stop;
        }

        return times;
    };

    console.log(apiRE);
    apiRouter
        .use(function(req, res, next) {
            console.log('API request made');
            next();
        })
        .get(apiRE, function(req, res) {
            var keyword = req.params[1];
            var times = parseTimes(req.params[2], req.params[3]);
            trendByTime(keyword, times).then(function(data) {
                res.json(data);
            });
        });

    module.exports = apiRouter;

}());

(function() {
    'use strict';

    var googleTrends = require('google-trends-api');

    /*
     *  [
     *      [
     *          <time>,
     *          [
     *              <value>,
     *              ...
     *          ],
     *      ],
     *      ...
     *  ]
     */

    var tabulate = function(results) {
        var linearize = function(datum) {
            console.log(datum);
            return [
                datum.time,
                datum.value,
            ];
        };

        var data = results
            .default
            .timelineData
            .map(linearize);

        return data;
    };

    var fetchTrendByTime = function(keyword, times) {
        console.log('Fetching trend');
        var options = {
            keyword: keyword,
        };

        if (Object.prototype.hasOwnProperty.call(times, 'start')) {
            options.startTime = times.start;
        }

        if (Object.prototype.hasOwnProperty.call(times, 'stop')) {
            options.endTime = times.stop;
        }

        var trend = googleTrends
            .interestOverTime(options)
            .then(JSON.parse)
            .then(tabulate)
            .catch(function(err) {
                console.log('Error fetching trend data:');
                console.log(err);
            });

        return trend;
    };

    module.exports = fetchTrendByTime;

}());

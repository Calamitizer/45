(function() {
    'use strict';

    var googleTrends = require('google-trends-api');

    /*
     *  [
     *      [
     *          <time>,
     *          [
     *              <value1>,
     *              <value2>,
     *              ...
     *          ],
     *      ],
     *      ...
     *  ]
     */

    var tabulate = function(results) {
        var linearize = function(datum) {
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
            options.startTime = new Date(times.start * 1000);
        }

        if (Object.prototype.hasOwnProperty.call(times, 'stop')) {
            options.endTime = new Date(times.stop * 1000);
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

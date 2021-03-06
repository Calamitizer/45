(function() {
    'use strict';

    const d3 = require('d3');

    const xlvParse = require('../xlv-parse.js');
    const legendFactory = require('./legend-factory.js');

    function trendChartFactory() {
        var margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        };
        var width = 960;
        var height = 500;
        var keywords = [];
        var numTrends = 0;

        var xValue = d => (typeof d !== 'undefined')
            ? new Date((+d[0] * 1000))
            : d;
        var xScale = d3.scaleTime(); //date to position
        var X = d => xScale(xValue(d)); //datum to position

        var yValues = [];
        var yScales = [];
        var Ys = [];

        var lines = [];

        var legend;
        var axes = {};

        function doForEach(f) {
            Array.from(Array(numTrends), (_, i) => {
                f(i);
            });
        }

        function pushSeries(i) {
            yValues.push(d => d[1][i]);
            yScales.push(d3.scaleLinear());
            Ys.push(d => yScales[i](yValues[i](d)));
            lines.push(d3
                .line()
                .x(X)
                .y(Ys[i]));
        }

        function initSeries() {
            doForEach(pushSeries);
        }

        function initLegend() {
            legend = legendFactory().keywords(keywords);
        }

        function initAxes() {

            var formatAxis = function(axis) {
                //
            };

            var bottom = d3
                .axisBottom()
                .scale(xScale)
                .ticks(10, 0)
                .tickFormat(xlvParse.getFormatter(xScale));

            var yScale = d3
                .scaleLinear()
                .domain([
                    1,   // the extrema of
                    100, // Google Trends data
                ])
                .range([
                    height,
                    0,
                ]);

            var left = d3
                .axisLeft()
                .scale(yScale)

            Object.assign(axes, {
                bottom,
                left,
            });
        }

        function chart(selection) {
            selection.each(function(data) {

                // construct the appropriate number of scales, lines, &c.
                initSeries();

                initLegend();

                // init scales wih data, and populate them to the axes
                xScale
                    .domain(d3.extent(data).map(xValue))
                    .range([
                        0,
                        width,
                    ]);

                doForEach(i => {
                    yScales[i]
                        .domain([
                            0,
                            d3.max(data, yValues[i]),
                        ])
                        .range([
                            height,
                            0,
                        ]);
                });

                initAxes();

                // start drawing the chart
                var svg = d3
                    .select(this)
                    .selectAll('svg')
                    .data([data])
                    .enter()
                    .append('svg')
                    .attr('class', 'trend-chart-container')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom);

                var gInner = svg
                    .append('g')
                    .attr('class', 'inner-g')
                    .attr('transform', `translate(${margin.left},${margin.top})`);

                doForEach(i => {
                    gInner
                        .append('path')
                        .attr('class', `trend-line trend-line-${i + 1}`)
                        .attr('d', lines[i]);
                });

                // append legend and axes
                gInner.call(legend);

                var axesTranslations = {
                    bottom: `0,${height}`,
                    left: '0,0',
                };
                for (var orientation in axes) {
                    gInner
                        .append('g')
                        .attr('class', `trend-axis trend-axis-${orientation}`)
                        .attr('transform', `translate(${axesTranslations[orientation]})`)
                        .call(axes[orientation]);
                }

            });
        }

        function X(d) {
            return xScale(d[0]);
        }

        chart.margin = function(m) {
            if (!arguments.length) return margin;
            var dw = margin.left + margin.right - m.left - m.right;
            var dh = margin.top + margin.bottom - m.top - m.bottom;
            chart.width(width + dw);
            chart.height(height + dh);
            margin = m;
            return chart;
        };

        chart.width = function(w) {
            if (!arguments.length) return width;
            width = w - margin.left - margin.right;
            return chart;
        };

        chart.height = function(h) {
            if (!arguments.length) return height;
            height = h - margin.top - margin.bottom;
            return chart;
        };

        chart.keywords = function(kws) {
            if (!arguments.length) return keywords;
            keywords = kws;
            numTrends = keywords.length;
            return chart;
        };

        return chart;

    }

    module.exports = trendChartFactory;

}());

(function() {
    'use strict';

    const d3 = require('d3');

    function trendChartFactory() {
        var margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        };
        var width = 960;
        var height = 500;
        var numTrends = 0;
        var xValue = d => d[0];
        var yValues = [];
        var xScale = d3.scaleLinear();
        var yScales = [];
        var X = d => xScale(xValue(d));
        var Ys = [];
        var xAxis = d3
            .axisBottom(xScale)
            .ticks(6, 0);
        var lines = [];

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

        function chart(selection) {
            console.log('Chart() called');
            selection.each(function(data) {
                initSeries();

                xScale
                    .domain(d3.extent(data, xValue))
                    .range([
                        0,
                        width - margin.left - margin.right,
                    ]);

                doForEach(i => {
                    yScales[i]
                        .domain([
                            0,
                            d3.max(data, yValues[i]),
                        ])
                        .range([
                            height - margin.top - margin.bottom,
                            0,
                        ]);
                });

                var svg = d3
                    .select(this)
                    .selectAll('svg')
                    .data([data])
                    .enter()
                    .append('svg')
                    .attr('class', 'trend-chart')
                    .attr('width', width)
                    .attr('height', height);

                var gInner = svg
                    .append('g')
                    .attr('class', 'inner-g')
                    .attr('transform', `translate(${margin.left},${margin.top})`);

                doForEach(i => {
                    gInner
                        .append('path')
                        .attr('class', `line line-${i + 1}`)
                        .attr('d', lines[i]);
                });

                gInner
                    .append('g')
                    .attr('class', 'x axis')
                    .attr('transform', `translate(0,0)`)
                    .call(xAxis);
            });
        }

        function X(d) {
            return xScale(d[0]);
        }

        chart.margin = function(_) {
            if (!arguments.length) return margin;
            margin = _;
            return chart;
        };

        chart.width = function(_) {
            if (!arguments.length) return width;
            width = _;
            return chart;
        };

        chart.height = function(_) {
            if (!arguments.length) return height;
            height = _;
            return chart;
        };

        chart.numTrends = function(_) {
            if (!arguments.length) return numTrends;
            numTrends = _;
            return chart;
        };

        return chart;

    }

    module.exports = trendChartFactory;

}());

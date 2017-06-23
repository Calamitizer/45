(function() {
    'use strict';

    const d3 = require('d3');

    function trendChart() {
        let margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        };
        let width = 1000;
        let height = 500;
        let xValue = function(d) { return d[0]; };
        let yValue = function(d) { return d[1]; };
        let xScale = d3.scaleLinear();
        let yScale = d3.scaleLinear();
        let xAxis = d3
            .axisBottom(xScale)
            .ticks(6, 0);
        let area = d3
            .area()
            .x(X)
            .y1(Y);
        let line = d3
            .line()
            .x(X)
            .y(Y);

        function chart(selection) {
            console.log('Chart() called');
            selection.each(function(data) {
                data = data.map((d, i) => {
                 return [xValue.call(data, d, i), yValue.call(data, d, i)];
                });

                let xDomain = d3.extent(data, d => d[0]);

                xScale
                    .domain(xDomain)
                    .range([0, width - margin.left - margin.right]);

                let yDomain = [0, d3.max(data, d => d[1])];

                yScale
                    .domain(yDomain)
                    .range([height - margin.top - margin.bottom, 0]);

                console.log(`data: `);
                console.log(data);

                let svg = d3
                    .select(this)
                    .selectAll('svg')
                    .data([data])
                    .enter()
                    .append('svg')
                    .attr('class', 'trend-chart')
                    .attr('width', width)
                    .attr('height', height);

                let gEnter = svg
                    .append('g')
                    .attr('class', 'inner-g')
                    .attr('transform', `translate(${margin.left},${margin.top})`);

                gEnter
                    .append('path')
                    .attr('class', 'area');

                gEnter
                    .append('path')
                    .attr('class', 'line');

                gEnter
                    .append('g')
                    .attr('class', 'x axis');

                gEnter
                    .select('.area')
                    .attr('d', area.y0(yScale.range()[0]));

                gEnter
                    .select('.line')
                    .attr('d', line);

                gEnter
                    .select('.x.axis')
                    .attr('transform', `translate(0,${yScale.range()[0]})`)
                    .call(xAxis);
            });
        }

        function X(d) {
            return xScale(d[0]);
        }

        function Y(d) {
            return yScale(d[1]);
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
            if(!arguments.length) return height;
            height = _;
            return chart;
        };

        chart.x = function(_) {
            if (!arguments.length) return xValue;
            xValue = _;
            return chart;
        };

        chart.y = function(_) {
            if (!arguments.length) return yValue;
            yValue = _;
            return chart;
        };

        return chart;

    }

    module.exports = trendChart;

}());

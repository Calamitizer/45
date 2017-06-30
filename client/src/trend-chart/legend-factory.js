(function() {
    'use strict';

    const d3 = require('d3');

    var legendFactory = function() {
        var margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
        };
        var width = 120;
        var height = 60;
        var lineHeight = 30;
        var keywords = [];

        var drawLegend = function(selection) {
            var legendContainer = selection
                .append('g')
                .attr('class', 'legend')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);

            var border = legendContainer
                .append('rect')
                .attr('class', 'legend-border')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);

            var legend = legendContainer
                .append('g')
                .attr('class', 'legend-content')
                .attr('transform', `translate(${margin.left},${margin.top})`)

            var key = legend
                .selectAll('g')
                .data(keywords)
                .enter()
                .append('g')
                .attr('class', 'legend-key')
                .attr('transform', (_, i) => `translate(0,${i * lineHeight})`);

            var circleRadius = 5;
            var circlePadding = 5;
            var keyCircle = key
                .append('circle')
                .attr('class', (_, i) => `trend-key-circle trend-key-circle-${i + 1}`)
                .attr('r', (lineHeight / 2) - 6);

            var keyName = key
                .append('text')
                .attr('class', 'legend-key-name')
                .attr('transform', `translate(${(2 * circleRadius) + circlePadding},0)`)
                .text(d => d);
        };

        drawLegend.keywords = function(kws) {
            if (!arguments.length) return keywords;
            keywords = kws;
            return drawLegend;
        };

        return drawLegend;
    };

    module.exports = legendFactory;

}());

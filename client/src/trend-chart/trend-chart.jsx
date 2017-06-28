(function() {
    'use strict';

    const React = require('react');
    const ReactFauxDOM = require('react-faux-dom');
    const PropTypes = require('prop-types');
    const d3 = require('d3');
    const axios = require('axios');

    const trendChartFactory = require('./trend-chart-factory.js');

    const propTypes = {
        keyword: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        margin: PropTypes.shape({
            top: PropTypes.number.isRequired,
            right: PropTypes.number.isRequired,
            bottom: PropTypes.number.isRequired,
            left: PropTypes.number.isRequired,
        }).isRequired,
    };

    class TrendChart extends React.Component {
        constructor(props) {
            super(props);
        }

        static propTypes = propTypes

        unpackKeywords() {
            return this.props.keyword.split('&');
        }

        render() {
            const div = new ReactFauxDOM.Element('div');

            var chart = trendChartFactory()
                .keywords(this.unpackKeywords())
                .margin(this.props.margin);

            d3
                .select(div)
                .datum(this.props.data)
                .call(chart);

            return div.toReact();
        }
    }

    module.exports = TrendChart;

}());

(function() {
    'use strict';

    const React = require('react');
    const ReactFauxDOM = require('react-faux-dom');
    const propTypes = require('prop-types');
    const d3 = require('d3');
    const axios = require('axios');

    const chartFactory = require('./chart-factory.js');

    const data = [
        { date: '1', price: 4, },
        { date: '2', price: 8, },
        { date: '3', price: 15, },
        { date: '4', price: 16, },
        { date: '5', price: 23, },
        { date: '6', price: 42, },
    ];


    class Trend extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            const div = new ReactFauxDOM.Element('div');
            var chart = chartFactory()
                .margin({
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                })
                .x(d => +d[0])
                .y(d => +d[1][0]);
            d3
                .select(div)
                .datum(this.props.data)
                .call(chart);

            return div.toReact();
        }
    }

    module.exports = Trend;

}());

(function() {
    'use strict';

    var React = require('react');
    var ReactDOM = require('react-dom');

    var d3 = require('d3');
    var googleTrends = require('google-trends-api');

    var trendChart = require('./trend-chart/trend-chart.js');

    var xlv = xlv || {};

    console.log('Entry.js has started running');

    var Counter = require('./counter.jsx');

    class Trend extends React.Component {
        render() {
            /* */
        }
    }

    class App extends React.Component {
        render() {
            return (
                <div>
                    <h1>Hello, America!</h1>
                    <Counter />
                </div>
            );
        }
    }

    ReactDOM.render(<App />, document.getElementById('mount-point'));

    // ReactDOM.render(<App />, document.getElementById('mount-point'));

    function render() {
        ReactDOM.render(
            <TrendGraph model={trend} />,
            document.getElementByClassName(uuid)
        );
    }

    const data = [
        { date: '1', price: 4, },
        { date: '2', price: 8, },
        { date: '3', price: 15, },
        { date: '4', price: 16, },
        { date: '5', price: 23, },
        { date: '6', price: 42, },
    ];

    var chart = trendChart()
        .x(d => +d.date)
        .y(d => +d.price);

    d3
        .select('#example')
        .append('div')
        .datum(data)
        .call(chart);

    d3
        .select('body')
        .append('p')
        .text('I\'m dynamically generated!');
}());

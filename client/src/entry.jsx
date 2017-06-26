(function() {
    'use strict';

    const React = require('react');
    const ReactDOM = require('react-dom');

    const d3 = require('d3');
    const googleTrends = require('google-trends-api');

    const TrendContainer = require('./trend-chart/trend-container.jsx');

    console.log('Entry.js has started running');

    class App extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <div>
                    <h1>Hello, America!</h1>
                    <TrendContainer keyword="christmas" />
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

    /*
    var chart = trendChart()
        .x(d => +d.date)
        .y(d => +d.price);

    d3
        .select('#example')
        .append('div')
        .datum(data)
        .call(chart);
    */

    d3
        .select('body')
        .append('p')
        .text('I\'m dynamically generated');
}());

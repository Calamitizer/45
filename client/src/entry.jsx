(function() {
    'use strict';

    const React = require('react');
    const ReactDOM = require('react-dom');

    const d3 = require('d3');
    const googleTrends = require('google-trends-api');

    const Trend = require('./trend-chart/trend.jsx');

    console.log('Entry.js has started running');

    class App extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <div>
                    <h1>Hello, America!</h1>
                    <Trend keyword="christmas&easter" />
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

    d3
        .select('body')
        .append('p')
        .text('I\'m dynamically generated');
}());

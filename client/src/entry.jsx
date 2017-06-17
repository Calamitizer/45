(function() {
    'use strict';

    var React = require('react');
    var ReactDOM = require('react-dom');

    var d3 = require('d3');
    var googleTrends = require('google-trends-api');

    console.log('Entry.js has started running');

    class App extends React.Component {
        render() {
            return <h1>Hello, America!</h1>;
        }
    }

    ReactDOM.render(<App />, document.getElementById('mount-point'));

    var nums = [1, 2, 3, 4];
    var numsb = nums.map(v => v + 1);

    /*
    d3
        .select('body')
        .append('p')
        .text('I\'m dynamically generated!');
    */
}());

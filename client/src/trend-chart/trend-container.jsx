(function() {
    'use strict';

    const React = require('react');
    const axios = require('axios');

    const Trend = require('./trend.jsx');

    class TrendContainer extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [],
            };
        }

        componentDidMount() {
            var uri = `/api/v1/bytime/${this.props.keyword}/x/x/`;
            axios
                .get(uri)
                .then(res => {
                    this.setState({
                        data: res.data,
                    });
                });
        }

        render() {
            return <Trend data={this.state.data} />
        }
    }

    module.exports = TrendContainer;

}());

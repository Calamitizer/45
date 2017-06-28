(function() {
    'use strict';

    const React = require('react');
    const PropTypes = require('prop-types');
    const axios = require('axios');

    const TrendChart = require('./trend-chart.jsx');

    const defaultProps = {
        width: 960,
        height: 500,
        margin: {
            top: 30,
            right: 60,
            bottom: 30,
            left: 60,
        },
    };

    const propTypes = {
        keyword: PropTypes.string.isRequired,
        width: PropTypes.number,
        height: PropTypes.number,
        margin: PropTypes.shape({
            top: PropTypes.number.isRequired,
            right: PropTypes.number.isRequired,
            bottom: PropTypes.number.isRequired,
            left: PropTypes.number.isRequired,
        }),
    };

    class Trend extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [],
                dataLoaded: false,
            };
        }

        static defaultProps = defaultProps
        static propTypes = propTypes

        componentDidMount() {
            var uri = `/api/v1/bytime/${this.props.keyword}/x/x/`;
            axios
                .get(uri)
                .then(res => {
                    this.setState({
                        data: res.data,
                        dataLoaded: true,
                    });
                });
        }

        render() {
            const {
                keyword,
                width,
                height,
                margin,
            } = this.props;

            return (
                <div>
                    <h1>Keywords: {keyword}</h1>
                    <TrendChart
                        keyword={keyword}
                        width={width}
                        height={height}
                        margin={margin}
                        data={this.state.data}
                    />
                </div>
            );
        }
    }

    module.exports = Trend;

}());

(function() {
    'use strict';

    var React = require('react');

    class Counter extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                count: 0,
            };
            this.onLike = this.onLike.bind(this);
        }

        onLike() {
            let newCount = this.state.count + 1;
            this.setState({
                count: newCount,
            });
        }

        render() {
            return (
                <div>
                    Likes: <span>{ this.state.count }</span>
                    <div>
                        <button onClick={this.onLike}>Like</button>
                    </div>
                </div>
            );
        }
    }

    module.exports = Counter;
}());

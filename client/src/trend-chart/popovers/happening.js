(function() {
    'use strict';

    class Happening {
        constructor(props) {
            this.name = props.name;
            this.date = props.date;
            this.sources = props.sources;
        }
    }

    module.exports = Happening;

}());

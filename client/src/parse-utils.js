(function() {
    'use strict';

    /*
     *
     */

    var capitalize = function(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    var kwA2S = function(kwArray) {
        return kwArray.join('&');
    };

    var kwS2A= function(kwString) {
        return kwString.split('&');
    };

}());

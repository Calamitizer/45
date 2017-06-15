(function() {
    'use strict';

    require('dotenv').config();

    var express = require('express');
    var morgan = require('morgan');
    var bodyParser = require('body-parser');

    var path = require('path');
    var http = require('http');

    var xlv = express();

    xlv.use(morgan('dev'));
    xlv.use(bodyParser.json());
    xlv.use(bodyParser.urlencoded({
        extended: true,
    }));

    var siteRouter = require('./routers/site.js');

    xlv.use('/', siteRouter);

    var port = process.env.PORT || 4545;

    xlv.set('port', port);
    var server = http.createServer(xlv);
    server.listen(port);

}());

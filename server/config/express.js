var express = require('express'),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    logger = require('express-logger'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

module.exports = function (app, config) {
    function compile(str, path){
        return stylus(str).set('filename' , path);
    }
    //DONE//

    //TODO 1:configure express//
    //SET
    app.set('view engine', 'pug');

    app.use(helmet());
    app.use(logger({path: config.rootPath + '/logs'}));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(session({
        secret:'iRoCkThEhElLoUtOfYoU!',
        resave: true,
        saveUninitialized: true
    }));
    //DONE
};

var cfenv = require('cfenv');

var express = require('express'),
    app = express(),
    env = process.env.NODE_ENV =  process.env.NODE_ENV || 'development',
    config = require('./server/config/config.js')[env];

require('./server/config/express.js')(app, config);
app.use('/static', express.static(__dirname + '/public'))
app.use('/vendor', express.static(__dirname + '/public/vendor'))



app.get('/', function (req, res) {
    res.render('./../public/clientApp/index');
})

app.get('/test', function (req, res) {
    res.json({
        "test":"success"
    })
});

app.get("*", function (req, res) {
    res.redirect(400, '/');
})

var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

var cfenv = require('cfenv');

var express = require('express'),
  app = express(),
  env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
  config = require('./server/config/config.js')[env];

require('./server/config/express.js')(app, config);
app.use('/static', express.static(__dirname + '/public'))
app.use('/vendor', express.static(__dirname + '/public/vendor'))

var watson = require('watson-developer-cloud');

var conversation = watson.conversation({
  username: 'c2145a0c-3893-4c1f-87f4-ab4476c6dd92',
  password: 'IlpOh5RU3nMp',
  version: 'v1',
  version_date: '2016-09-20'
});


app.post('/chatResponse', function (req, res) {
  var text = req.body.text;
  
  conversation.message({
    workspace_id: '86007c58-0d08-4b52-b51a-aca6637e2814',
    input: {
      'text': text
    },
    context: {}
  }, function (err, response) {
    if (err)
      console.log('error:', err);
    else{
      var responseData = {
        text:response.output.text,
        confidence:response.intents[0].confidence,
        intent:response.intents[0].intent
      };
      res.json(responseData);
    }
  });
})

app.get('/', function (req, res) {
  res.render('./../public/clientApp/index');
})

app.get('/test', function (req, res) {
  res.json({
    "test": "success"
  })
});

app.get("*", function (req, res) {
  res.redirect(400, '/');
})

var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function () {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
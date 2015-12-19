'use strict';

const
  environment = process.env.NODE_ENV || 'development',
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

let appRoot = environment === 'production' ? 'dist' : 'dev';

app.use(bodyParser.json());
app.use(express.static(appRoot));

app.get('*', function(request, response, next) {
  response.sendFile(__dirname + '/' + appRoot + '/index.html');
});

let server = app.listen(process.env.PORT|| 8080, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

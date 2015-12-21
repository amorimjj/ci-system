'use strict';

const
  environment = process.env.NODE_ENV || 'development',
  express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  bodyParser = require('body-parser'),
  buildRoute = require('./api/routers/build');

//TODO: create dist with minifyied js and css
//let appRoot = environment === 'production' ? 'dist' : 'dev';
let appRoot = environment === 'dev';

app.use(bodyParser.json());
app.use(express.static(appRoot));
buildRoute(app, io);

app.get('*', function(request, response, next) {
  response.sendFile(__dirname + '/' + appRoot + '/index.html');
});

server.listen(process.env.PORT|| 8080, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

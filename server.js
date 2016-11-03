'use strict'

const express = require('express');
const http = require('http');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// Set jsx as the templating engine
app.set('views', path.resolve(__dirname, 'app/views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// Disable etag headers on responses
app.disable('etag');

app.use('/', require('./routes'));

// Set /public as our static content dir
app.use('/', express.static(path.join(__dirname, '/public/')));

// Fire it up (start our server)
const server = http.createServer(app);

server.listen(port, () => {
  console.log('Express server listening on port ' + port);
});

// Initialize socket.io
var io = require('socket.io').listen(http);
io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});

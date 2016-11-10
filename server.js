'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const promise = require('bluebird');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

// Initialize socket.io
const io = require('socket.io')(http.Server(app));
const socketEvents = require('./socketEvents')(io);
io.listen(3000);

// to support JSON-encoded bodies
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// Set jsx as the templating engine
app.set('views', path.resolve(__dirname, 'app/views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// Disable etag headers on responses
app.disable('etag');

// Connect to our mongo database
mongoose.Promise = promise;
mongoose.connect('mongodb://localhost/whistleblower');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to mongodb');
});

// Middleware
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/', require('./routes'));

// Set /public as our static content dir
app.use('/', express.static(path.join(__dirname, '/public/')));

// Fire it up (start our server)
const server = http.createServer(app);
server.listen(port, () => {
  console.log('Express server listening on port ' + port);
});

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const promise = require('bluebird');
const path = require('path');
const dbSeeder = require('./database/seeds/databaseSeeder');
const monitor = require('./app/jobs');
require('dotenv').config();

monitor.start();

const app = express();
const port = process.env.PORT || 8000;

// Initialize socket.io
const io = require('socket.io')(http.Server(app));
require('./socketEvents')(io);

io.listen(3000);

// to support JSON-encoded bodies
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true,
}));

// to hold session
app.use(session({
  secret: 'rthyuilu37jg735ty786935ikehruyh76',
  resave: false,
  saveUninitialized: true,
}));

// Set jsx as the templating engine
app.set('views', path.resolve(__dirname, 'app/views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use((req, res, next) => {
  const reqSession = req.session;
  const { error, success } = reqSession;

  if (reqSession) {
    delete reqSession.error;
    delete reqSession.success;
  }

  if (res) {
    const { locals } = res;
    locals.message = '';
    if (error) locals.message = { isError: true, text: error };
    if (success) locals.message = { isError: false, text: success };
  }
  next();
});

// Disable etag headers on responses
app.disable('etag');

const dbConnection = {
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || 'whistleblower',
};

// Connect to our mongo database
mongoose.Promise = promise;
mongoose.connect(`mongodb://${dbConnection.host}/${dbConnection.database}`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to mongodb');
  dbSeeder();
});

// Middleware
app.use((req, res, next) => {
  const request = req;
  request.io = io;
  next();
});

app.use('/', require('./routes'));

// Set /public as our static content dir
app.use('/', express.static(path.join(__dirname, '/public/')));

// Fire it up (start our server)
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

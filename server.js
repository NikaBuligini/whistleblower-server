import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import http from 'http';
import mongoose from 'mongoose';
import promise from 'bluebird';
import path from 'path';
import dotenv from 'dotenv';
import socket from 'socket.io';
import expressReactViews from 'express-react-views';
import graphqlHTTP from 'express-graphql';
import dbSeeder from './database/seeds/databaseSeeder';
import monitor from './app/jobs';
import socketEvents from './socketEvents';
import routes from './routes';
import graphqlSchema from './app/graph';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Initialize socket.io
const io = socket(http.Server(app));
socketEvents(io);

io.listen(3000);

monitor.start(io);

// to support JSON-encoded bodies
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// to hold session
app.use(
  session({
    secret: 'rthyuilu37jg735ty786935ikehruyh76',
    resave: false,
    saveUninitialized: true,
  }),
);

// Set jsx as the templating engine
app.set('views', path.resolve(__dirname, 'app/views'));
app.set('view engine', 'jsx');
app.engine('jsx', expressReactViews.createEngine());

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

app.use(
  '/graphql',
  graphqlHTTP(() => ({ schema: graphqlSchema, graphiql: true })),
);
app.use('/', routes);

// Set /public as our static content dir
app.use('/', express.static(path.resolve(__dirname, 'public')));

// Fire it up (start our server)
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

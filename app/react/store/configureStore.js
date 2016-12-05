const prod = require('./configureStore.prod');
const dev = require('./configureStore.dev');

module.exports = process.env.NODE_ENV === 'production' ? prod : dev;

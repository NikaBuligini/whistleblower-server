const prod = require('./App.prod');
const dev = require('./App.dev');

module.exports = process.env.NODE_ENV === 'production' ? prod : dev

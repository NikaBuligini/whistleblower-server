'use strict'

const express = require('express');
const router = express.Router();
require('express-session');

const home = require('./app/controllers/home.controller');

router.get('/', home.homepage);
router.post('/test', (req, res) => {
  console.log(req.body);
  req.io.sockets.emit('action', { type: 'MEMORY_UPDATE', info: req.body });

  res.json({ greet: 'hi' });
})

module.exports = router

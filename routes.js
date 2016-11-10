'use strict'

const express = require('express');
const router = express.Router();
require('express-session');

const home = require('./app/controllers/home.controller');
const project = require('./app/controllers/project.controller');

router.get('/', home.dashboard);
router.get('/projects', project.list);
router.get('/api/projects', project.listAll);
router.post('/test', (req, res) => {
  // console.log(req.body);
  req.io.sockets.emit('action', { type: 'MEMORY_UPDATE', info: req.body });

  res.json({ greet: 'hi' });
})

module.exports = router

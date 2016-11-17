'use strict'

const express = require('express');
const router = express.Router();
require('express-session');

const home = require('./app/controllers/home.controller');
const project = require('./app/controllers/project.controller');
const service = require('./app/controllers/service.controller');

router.get('/', home.dashboard);
router.get('/projects', project.list);
router.get('/projects/:projectName', project.showSingleProject);

router.get('/api/project', project.getAll);
router.get('/api/project/:projectName', project.get);
router.put('/api/project', project.create);

router.get('/api/service', service.getByProjectId);
router.put('/api/service', service.create);
router.get('/api/service/:serviceId', service.get);
router.post('/api/service/:serviceId/activate', service.activate);

router.get('/api/projects/clear', project.clear);
router.post('/test', (req, res) => {
  // console.log(req.body);
  req.io.sockets.emit('action', { type: 'MEMORY_UPDATE', info: req.body });

  res.json({ greet: 'hi' });
})

module.exports = router

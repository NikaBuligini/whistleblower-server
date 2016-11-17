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
router.get('/api/projects', project.listAll);
router.get('/api/project/:projectName', project.getSingle);
router.post('/api/project/:projectName/service', project.createService);
router.get('/api/project/:projectName/services', project.getServicesForProject);
router.post('/api/service/:serviceId/activate', service.activate);
router.post('/api/project/add', project.create);
router.get('/api/projects/clear', project.clear);
router.post('/test', (req, res) => {
  // console.log(req.body);
  req.io.sockets.emit('action', { type: 'MEMORY_UPDATE', info: req.body });

  res.json({ greet: 'hi' });
})

module.exports = router

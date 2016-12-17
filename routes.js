const express = require('express');

const router = express.Router();
require('express-session');

const home = require('./app/controllers/home.controller');
const auth = require('./app/controllers/auth.controller');
const project = require('./app/controllers/project.controller');
const service = require('./app/controllers/service.controller');
const user = require('./app/controllers/user.controller');

const authMiddleware = require('./app/middlewares/auth.js');

router.get('/', authMiddleware.notAuthenticated, home.dashboard);
router.get('/projects', authMiddleware.notAuthenticated, project.list);
router.get('/projects/:projectName', authMiddleware.notAuthenticated, project.showSingleProject);
router.get('/projects/:projectName/:serviceId', authMiddleware.notAuthenticated, service.showSingleService);

router.get('/auth', auth.index);
router.get('/auth/sign-up', auth.index);
router.post('/auth/login', auth.login);
router.post('/auth/sign-up', auth.signUp);
router.get('/auth/logout', auth.logout);

router.get('/api/project', project.getAll);
router.get('/api/project/:projectName', project.get);
router.put('/api/project/:projectId/permission', project.addPermission);
router.delete('/api/project/:projectId/permission', project.removePermission);
router.put('/api/project', project.create);

router.get('/api/service', service.getByProjectId);
router.put('/api/service', service.create);
router.get('/api/service/:serviceId', service.get);
router.post('/api/service/:serviceId/activate', service.activate);

router.get('/api/user', user.getAll);

router.get('/api/projects/clear', project.clear);
router.post('/test', (req, res) => {
  req.io.sockets.emit('action', { type: 'MEMORY_UPDATE', info: req.body });

  res.json({ greet: 'hi' });
});

module.exports = router;

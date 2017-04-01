import express from 'express';

import 'express-session';

import dashboard from './app/controllers/home.controller';
import * as auth from './app/controllers/auth.controller';
import * as project from './app/controllers/project.controller';
import * as service from './app/controllers/service.controller';
import getAllUsers from './app/controllers/user.controller';

import { notAuthenticated } from './app/middlewares/auth';

const router = express.Router();

router.get('/', notAuthenticated, dashboard);
router.get('/projects', notAuthenticated, project.list);
router.get('/projects/:projectName', notAuthenticated, project.showSingleProject);
router.get('/projects/:projectName/:serviceId', notAuthenticated, service.showSingleService);

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
router.put('/api/service/:serviceId/store', service.store);
router.post('/api/service/:serviceId/activate', service.activate);

router.get('/api/user', getAllUsers);

router.get('/api/me/project', notAuthenticated, project.getProjectsForUser);

router.get('/api/projects/clear', project.clear);
router.post('/test', service.test);

export default router;

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import DefaultLayout from './containers/layouts/DefaultLayout';
import AuthLayout from './containers/layouts/AuthLayout';

import Dashboard from './containers/Dashboard';
import Login from './containers/auth/Login';
import SignUp from './containers/auth/SignUp';
import ProjectList from './containers/projects/ProjectList';
import Project from './containers/projects/Project';

export default (
  <Route path="/">
    <IndexRoute component={Dashboard} />
    <Route path="projects" component={DefaultLayout}>
      <IndexRoute component={ProjectList} />
      <Route path=":projectName" component={Project} />
    </Route>
    <Route path="auth" component={AuthLayout}>
      <IndexRoute component={Login} />
      <Route path="sign-up" component={SignUp} />
    </Route>
  </Route>
);

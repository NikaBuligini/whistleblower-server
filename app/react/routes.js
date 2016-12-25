import React from 'react';
import { Route, IndexRoute } from 'react-router';

import DefaultLayout from './containers/layouts/DefaultLayout';
import AuthLayout from './containers/layouts/AuthLayout';

import Dashboard from './containers/dashboard';
import Login from './containers/auth/Login';
import SignUp from './containers/auth/SignUp';
import ProjectList from './containers/projects/ProjectList';
import Project from './containers/projects/Project';
import Service from './containers/services/Service';

export default (
  <Route path="/">
    <IndexRoute component={Dashboard} />
    <Route path="projects" component={DefaultLayout}>
      <IndexRoute component={ProjectList} />
      <Route path=":projectName">
        <IndexRoute component={Project} />
        <Route path=":serviceId" component={Service} />
      </Route>
    </Route>
    <Route path="auth" component={AuthLayout}>
      <IndexRoute component={Login} />
      <Route path="sign-up" component={SignUp} />
    </Route>
  </Route>
);

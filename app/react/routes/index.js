import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { ViewerQueries } from '../queries';

import { AuthLayout, DefaultLayout } from '../containers/layouts';

import Dashboard from '../containers/dashboard';
import { Login, SignUp } from '../containers/auth';
import ProjectList from '../containers/projects/ProjectList';
import Project from '../containers/projects/Project';
import Service from '../containers/services/Service';

export default (
  <Route
    path="/"
    // queries={ViewerQueries}
  >
    <IndexRoute component={Dashboard} queries={ViewerQueries} />
    <Route path="projects" component={DefaultLayout}>
      <IndexRoute component={ProjectList} queries={ViewerQueries} />
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

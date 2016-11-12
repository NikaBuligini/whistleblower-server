import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'

import DefaultLayout from './containers/layouts/default'
import Dashboard from './containers/Dashboard'
import ProjectList from './containers/projects/ProjectList'
import Project from './containers/projects/Project'

export default (
  <Route path="/" component={DefaultLayout}>
    <IndexRoute component={Dashboard}/>
    <Route path="projects">
      <IndexRoute component={ProjectList}/>
      <Route path=":projectName" component={Project}/>
    </Route>
  </Route>
)

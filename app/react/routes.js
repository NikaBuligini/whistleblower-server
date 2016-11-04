import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'

import DefaultLayout from './containers/layouts/default'
import Dashboard from './containers/Dashboard'

export default (
  <Route path="/" component={DefaultLayout}>
    <IndexRoute component={Dashboard}/>
  </Route>
)

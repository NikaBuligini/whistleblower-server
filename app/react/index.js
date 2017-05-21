import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import Relay from 'react-relay';
import ReactRouterRelay from 'react-router-relay';
import routes from './routes/index';
import '../styles/main.scss';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql', {
    credentials: 'same-origin',
  }),
);

render(
  // <Relay.Renderer
  //   environment={Relay.Store}
  //   Container={App}
  //   queryConfig={new AppHomeRoute()}
  // />
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(ReactRouterRelay)}
    environment={Relay.Store}
    routes={routes}
  />,
  document.getElementById('mount'),
);

import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
import Relay from 'react-relay';
import ReactRouterRelay from 'react-router-relay';
// import App from './components/App';
// import AppHomeRoute from './routes/AppHomeRoute';
import routes from './routes/index';
import '../styles/main.scss';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql', {
    credentials: 'same-origin',
  }),
);

// import configureStore from './store/configureStore';
// import App from './containers/App';

// const state = {
//   preloaded: {
//     roles: [],
//   },
// };
// const preloadedJson = document.getElementById('preloaded');
// if (preloadedJson) {
//   state.preloaded = JSON.parse(preloadedJson.value);
// }

// const store = configureStore(state);

// Create an enhanced history that syncs navigation events with the store
// const history = syncHistoryWithStore(browserHistory, store);

// render(
//   <App store={store} history={history} />,
//   document.getElementById('mount'),
// );

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

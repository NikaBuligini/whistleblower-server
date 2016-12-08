import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import '../styles/main.scss';

import configureStore from './store/configureStore';
import App from './containers/App';

const state = {
  preloaded: {
    roles: [],
  },
};
const roles = document.getElementById('roles');
if (roles) {
  state.preloaded.roles = JSON.parse(roles.value);
}

const store = configureStore(state);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <App store={store} history={history} />,
  document.getElementById('mount'),
);

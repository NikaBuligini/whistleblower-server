import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes';
import { StorePropType, HistoryPropType } from '../propTypes';

const Root = (props) => {
  const { store, history } = props;
  return (
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  );
};

Root.propTypes = {
  store: StorePropType.isRequired,
  history: HistoryPropType.isRequired,
};

export default Root;

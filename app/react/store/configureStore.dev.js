import { createStore, applyMiddleware, compose } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import api from '../middleware/api';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
// import devTools from 'remote-redux-devtools';

let socket = io('http://localhost:3000');
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

export default function configureStore (preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, socketIoMiddleware, api, createLogger()),
      // DevTools.instrument()
      // devTools({ realtime: true })
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
    )
  );

  // if devToolsExtension is not installed use
  // if (!window.devToolsExtension) {
  //   devTools.updateStore(store)
  // }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

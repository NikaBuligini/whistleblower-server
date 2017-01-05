import { createStore, applyMiddleware, compose } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';
import api from '../middleware/api';
import websocket from '../middleware/websocket';
import rootReducer from '../reducers';
// import devTools from 'remote-redux-devtools';

/**
 * add createLogger() to applyMiddleware for logs
 */
export default function configureStore(preloadedState) {
  const socket = io('localhost:3000');

  socket.on('connect', () => {
    console.log('connected to socket');
  });
  // socket.on('event', function(data){
  //   console.log(data);
  // });
  // socket.on('disconnect', function(){});
  const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, socketIoMiddleware, api, websocket),
      // devTools({ realtime: true })
      window.devToolsExtension ? window.devToolsExtension() : null,
    ),
  );

  // if devToolsExtension is not installed use
  // if (!window.devToolsExtension) {
  //   devTools.updateStore(store)
  // }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = rootReducer;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

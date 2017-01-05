import { createStore, applyMiddleware, compose } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import websocket from '../middleware/websocket';
import rootReducer from '../reducers';

export default function configureStore(preloadedState) {
  const socket = io('localhost:3000');

  socket.on('connect', () => {
    console.log('connected to socket');
  });

  const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, socketIoMiddleware, api, websocket),
    ),
  );

  return store;
}

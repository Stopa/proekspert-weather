// @flow

import { createStore, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import LoggerMiddleware from 'redux-logger';

import rootReducer from './reducers';

export default createStore(
  rootReducer,
  applyMiddleware(ThunkMiddleware, LoggerMiddleware),
);

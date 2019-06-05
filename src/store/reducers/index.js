// @flow

import { combineReducers } from 'redux';

import ui from './ui';
import forecast from './forecast';

export default combineReducers({
  ui,
  forecast,
});

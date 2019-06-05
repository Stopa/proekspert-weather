// @flow

import { combineReducers } from 'redux';

function query(state = null) {
  return state;
}

const TEMP_MODES = {
  C: 'C',
  F: 'F',
};

function mode(state = TEMP_MODES.C) {
  return state;
}

function error(state = null) {
  return state;
}

export default combineReducers({
  query,
  mode,
  error,
});

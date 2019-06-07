// @flow

import { combineReducers } from 'redux';

import TEMP_MODES from '../../data/TEMP_MODES';

import {
  SET_QUERY, REQUEST_FORECAST, RECEIVE_FORECAST, SET_ERROR, SET_MODE, SHOW_RESULTS, HIDE_RESULTS,
} from '../actions/ui';

function query(state = null, action) {
  switch (action.type) {
    case SET_QUERY:
      return action.payload.query;
    case RECEIVE_FORECAST: {
      const { location: { name } } = action.payload.json;

      return name;
    }
    default:
      return state;
  }
}

function mode(state = TEMP_MODES.C, action) {
  switch (action.type) {
    case SET_MODE:
      return action.payload.mode;
    default:
      return state;
  }
}

function error(state = null, action) {
  switch (action.type) {
    case SET_ERROR:
      return action.payload.message;
    default:
      return state;
  }
}

function loading(state = false, action) {
  switch (action.type) {
    case REQUEST_FORECAST:
      return true;
    case RECEIVE_FORECAST:
    case SET_ERROR:
      return false;
    default:
      return state;
  }
}

function showResults(state = false, action) {
  switch (action.type) {
    case SHOW_RESULTS:
    case RECEIVE_FORECAST:
      return true;
    case HIDE_RESULTS:
    case SET_ERROR:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  query,
  mode,
  error,
  loading,
  showResults,
});

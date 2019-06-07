// @flow

import success from '../../data/success.json';
import error from '../../data/error.json';
import TEMP_MODES from '../../data/TEMP_MODES';

export const SET_QUERY = 'SET_QUERY';

export function setQuery(query: ?string) {
  return {
    type: SET_QUERY,
    payload: {
      query,
    },
  };
}

export const REQUEST_FORECAST = 'REQUEST_FORECAST';

function requestForecast() {
  return {
    type: REQUEST_FORECAST,
  };
}

export const RECEIVE_FORECAST = 'RECEIVE_FORECAST';

function receiveForecast(json) {
  return {
    type: RECEIVE_FORECAST,
    payload: {
      json,
    },
  };
}

export const SET_ERROR = 'SET_ERROR';

function setError(message) {
  return {
    type: SET_ERROR,
    payload: {
      message,
    },
  };
}

export function fetchForecast() {
  return async function fetchForecastThunk(dispatch: Function, getState: Function) {
    const { ui: { query } } = getState();

    dispatch(requestForecast());

    try {
      const mockFetch = new Promise((resolve) => {
        window.setTimeout(() => {
          resolve(query === 'success' ? success : error);
        }, 3000);
      });

      const json = await mockFetch;

      if (json.error) {
        throw new Error(json.error.message);
      }

      return dispatch(receiveForecast(json));
    } catch (e) {
      const { message } = e;

      return dispatch(setError(message));
    }
  };
}

export const SET_MODE = 'SET_MODE';

export function setMode(mode: string) {
  if (!Object.keys(TEMP_MODES).includes(mode)) {
    throw new Error(`Invalid temperature mode provided: ${mode}`);
  }

  return {
    type: SET_MODE,
    payload: {
      mode,
    },
  };
}

export const SHOW_RESULTS = 'SHOW_RESULTS';

export function showResults() {
  return {
    type: SHOW_RESULTS,
  };
}

export const HIDE_RESULTS = 'HIDE_RESULTS';

export function hideResults() {
  return {
    type: HIDE_RESULTS,
  };
}

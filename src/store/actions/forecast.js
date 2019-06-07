// @flow

import success from '../../data/success.json';
import error from '../../data/error.json';

import { setError } from './ui';

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

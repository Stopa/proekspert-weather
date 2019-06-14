// @flow

import { setError } from './ui';

import type { Forecast } from '../../types/Forecast';

import config from '../../config.json';

export const REQUEST_FORECAST = 'REQUEST_FORECAST';

function requestForecast() {
  return {
    type: REQUEST_FORECAST,
  };
}

export const RECEIVE_FORECAST = 'RECEIVE_FORECAST';

function receiveForecast(forecast) {
  return {
    type: RECEIVE_FORECAST,
    payload: {
      forecast,
    },
  };
}

function parseDay(day) {
  const {
    // ESLint suppression - This data comes from Apixu and is beyond my control
    /* eslint-disable camelcase */
    date_epoch,
    day: {
      condition: { code: conditionCode },
      maxtemp_c: maxTempC,
      maxtemp_f: maxTempF,
      mintemp_c: minTempC,
      mintemp_f: minTempF,
      avgtemp_c: avgTempC,
      avgtemp_f: avgTempF,
    },
    /* eslint-enable */
  } = day;

  return {
    // ESLint suppression - This data comes from Apixu and is beyond my control
    // eslint-disable-next-line camelcase
    date: date_epoch * 1000,
    conditionCode,
    maxTempC,
    maxTempF,
    minTempC,
    minTempF,
    avgTempC,
    avgTempF,
  };
}

export const appCacheKey = 'weatherAppCache';

export function fetchForecast() {
  return async function fetchForecastThunk(dispatch: Function, getState: Function) {
    const { ui: { query } } = getState();

    dispatch(requestForecast());

    try {
      const { protocol } = window.location;

      const requestURL = new URL(`${protocol}//api.apixu.com/v1/forecast.json`);

      requestURL.searchParams.set('days', '7');
      requestURL.searchParams.set('q', query);
      requestURL.searchParams.set('key', config.api_key);

      const response = await fetch(requestURL);

      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.message);
      }

      const {
        current: {
          // ESLint suppression - This data comes from Apixu and is beyond my control
          // eslint-disable-next-line camelcase
          last_updated_epoch,
          condition: { code: conditionCode },
          temp_c: tempC,
          temp_f: tempF,
        },
        forecast: { forecastday },
      } = json;

      const current = {
        // ESLint suppression - This data comes from Apixu and is beyond my control
        // eslint-disable-next-line camelcase
        date: last_updated_epoch * 1000,
        conditionCode,
        tempC,
        tempF,
      };

      const days = forecastday.map(parseDay);

      const forecast = {
        location: json.location.name,
        current,
        days,
      };

      window.localStorage.setItem(appCacheKey, JSON.stringify(forecast));

      return dispatch(receiveForecast(forecast));
    } catch (e) {
      const { message } = e;

      return dispatch(setError(message));
    }
  };
}

export function restoreForecastFromCache(forecast: Forecast) {
  return function restoreForecastFromCacheThunk(dispatch: Function) {
    dispatch(receiveForecast(forecast));

    return dispatch(fetchForecast());
  };
}

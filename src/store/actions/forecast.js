// @flow

import { setError } from './ui';

import type { ForecastCurrent } from '../../types/ForecastCurrent';
import type { ForecastDay } from '../../types/ForecastDay';

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

export const appCacheKey = 'weatherAppCache';

export function fetchForecast() {
  return async function fetchForecastThunk(dispatch: Function, getState: Function) {
    const { ui: { query } } = getState();

    dispatch(requestForecast());

    try {
      const requestURL = new URL('http://api.apixu.com/v1/forecast.json');

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
          last_updated_epoch, condition: { code }, temp_c, temp_f,
        },
        forecast: { forecastday },
      } = json;

      const current = {
        // ESLint suppression - This data comes from Apixu and is beyond my control
        // eslint-disable-next-line camelcase
        date: last_updated_epoch * 1000,
        conditionCode: code,
        tempC: temp_c,
        tempF: temp_f,
      };

      const days = forecastday.map((day) => {
        const {
          // ESLint suppression - This data comes from Apixu and is beyond my control
          /* eslint-disable camelcase */
          date_epoch,
          day: {
            condition: { code: dayCode },
            maxtemp_c,
            maxtemp_f,
            mintemp_c,
            mintemp_f,
            avgtemp_c,
            avgtemp_f,
          },
          /* eslint-enable */
        } = day;

        return {
          // ESLint suppression - This data comes from Apixu and is beyond my control
          // eslint-disable-next-line camelcase
          date: date_epoch * 1000,
          conditionCode: dayCode,
          maxTempC: maxtemp_c,
          maxTempF: maxtemp_f,
          minTempC: mintemp_c,
          minTempF: mintemp_f,
          avgTempC: avgtemp_c,
          avgTempF: avgtemp_f,
        };
      });

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

type Forecast = {
  current: ForecastCurrent,
  days: Array<ForecastDay>,
  location: string,
}

export function restoreForecastFromCache(forecast: Forecast) {
  return function restoreForecastFromCacheThunk(dispatch: Function) {
    dispatch(receiveForecast(forecast));

    dispatch(fetchForecast());
  };
}

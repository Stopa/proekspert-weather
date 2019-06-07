// @flow

import { combineReducers } from 'redux';

import { RECEIVE_FORECAST } from '../actions/forecast';

import type { ForecastCurrent } from '../../types/ForecastCurrent';
import type { ForecastDay } from '../../types/ForecastDay';

function current(state: ?ForecastCurrent = null, action) {
  switch (action.type) {
    case RECEIVE_FORECAST: {
      const {
        current: {
          // ESLint suppression - This data comes from Apixu and is beyond my control
          // eslint-disable-next-line camelcase
          last_updated_epoch, condition: { code }, temp_c, temp_f,
        },
      } = action.payload.json;

      return {
        // ESLint suppression - This data comes from Apixu and is beyond my control
        // eslint-disable-next-line camelcase
        date: last_updated_epoch * 1000,
        conditionCode: code,
        tempC: temp_c,
        tempF: temp_f,
      };
    }
    default:
      return state;
  }
}

function days(state: ?Array<ForecastDay> = null, action) {
  switch (action.type) {
    case RECEIVE_FORECAST: {
      const { forecast: { forecastday } } = action.payload.json;

      return forecastday.map((day) => {
        const {
          // ESLint suppression - This data comes from Apixu and is beyond my control
          /* eslint-disable camelcase */
          date_epoch,
          day: {
            condition: { code },
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
          conditionCode: code,
          maxTempC: maxtemp_c,
          maxTempF: maxtemp_f,
          minTempC: mintemp_c,
          minTempF: mintemp_f,
          avgTempC: avgtemp_c,
          avgTempF: avgtemp_f,
        };
      });
    }
    default:
      return state;
  }
}

export default combineReducers({
  current,
  days,
});

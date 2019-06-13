// @flow

import { RECEIVE_FORECAST } from '../actions/forecast';

import type { Forecast } from '../../types/Forecast';

export default function forecast(state: ?Forecast = null, action: Object) {
  switch (action.type) {
    case RECEIVE_FORECAST: {
      const { current, days } = action.payload.forecast;

      return { current, days };
    }
    default:
      return state;
  }
}

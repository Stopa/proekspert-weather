// @flow

import { RECEIVE_FORECAST } from '../actions/forecast';

import type { ForecastCurrent } from '../../types/ForecastCurrent';
import type { ForecastDay } from '../../types/ForecastDay';

type State = {
  current: ForecastCurrent,
  days: Array<ForecastDay>,
}

export default function forecast(state: ?State = null, action: Object) {
  switch (action.type) {
    case RECEIVE_FORECAST: {
      const { current, days } = action.payload.forecast;

      return { current, days };
    }
    default:
      return state;
  }
}

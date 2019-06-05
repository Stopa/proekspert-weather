// @flow

import { combineReducers } from 'redux';

import type { moment } from 'moment';

type ForecastCurrent = {
  date: moment,
  condition_code: number,
  temp_c: number,
  temp_f: number,
}

function current(state: ForecastCurrent = null) {
  return state;
}

type ForecastDay = {
  date: moment,
  condition_code: number,
  maxtemp_c: number,
  maxtemp_f: number,
  mintemp_c: number,
  mintemp_f: number,
  avgtemp_c: number,
  avgtemp_f: number,
}

function days(state: Array<ForecastDay> = null) {
  return state;
}

export default combineReducers({
  current,
  days,
});

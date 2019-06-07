// @flow

import type { moment } from 'moment';

export type ForecastCurrent = {
  date: moment,
  conditionCode: number,
  tempC: number,
  tempF: number,
}

// @flow

import type { moment } from 'moment';

export type ForecastDay = {
  date: moment,
  conditionCode: number,
  maxTempC: number,
  maxTempF: number,
  minTempC: number,
  minTempF: number,
  avgTempC: number,
  avgTempF: number,
}

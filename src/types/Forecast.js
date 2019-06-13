// @flow

export type Forecast = {
  current: ForecastCurrent,
  days: Array<ForecastDay>,
  location: string,
}

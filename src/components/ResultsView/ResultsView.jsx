// @flow

import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import classes from './ResultsView.module.scss';

import { hideResults } from '../../store/actions/ui';

import conditions from '../../data/weather-conditions.json';

import type { ForecastDay } from '../../types/ForecastDay';
import type { ForecastCurrent } from '../../types/ForecastCurrent';

import DayBlock from '../DayBlock';
import TempModeToggle from '../TempModeToggle';
import WeatherConditionIcon from '../WeatherConditionIcon';

import useTemp from '../../hooks/useTemp';

type Props = {
  current: ForecastCurrent,
  days: Array<ForecastDay>,
  goToSearch: Function,
  query: string,
}

function ResultsView(props: Props) {
  const {
    goToSearch, current, days, query,
  } = props;

  const { tempC, tempF } = current;

  const currentCondition = conditions[current.conditionCode];

  if (!currentCondition) {
    throw new Error('Invalid condition code provided.');
  }

  const currentTemperature = useTemp(tempC, tempF);

  const today = days[0];

  const maxTemperature = useTemp(today.maxTempC, today.maxTempF);

  const minTemperature = useTemp(today.minTempC, today.minTempF);

  const avgTemperature = useTemp(today.avgTempC, today.avgTempF);

  return (
    <section className={classes.ResultsView}>
      <header className={classes.Header}>
        <button type="button" aria-label="Back to search" className={`${classes.BackButton} material-icons`} onClick={goToSearch}>arrow_back</button>
        <h1>{ query }</h1>
        <span className={classes.end}>
          <TempModeToggle />
        </span>
      </header>
      <section className={classes.Now}>
        <time dateTime={current.date}>{ moment(current.date).format('dddd, MMMM Do YYYY') }</time>
        <div className={classes.Now_Condition_Text}>
          { currentCondition.description }
        </div>
        <section className={classes.Now_Body}>
          <section className={classes.Now_Condition}>
            { currentTemperature }
            <span className={classes.icon}>
              <WeatherConditionIcon code={current.conditionCode} />
            </span>
          </section>
          <table className={classes.TemperaturesTable}>
            <tbody>
              <tr>
                <th scope="row">Highest</th>
                <td>
                  { maxTemperature }
                </td>
              </tr>
              <tr>
                <th scope="row">Lowest</th>
                <td>
                  { minTemperature }
                </td>
              </tr>
              <tr>
                <th scope="row">Average</th>
                <td>
                  { avgTemperature }
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
      <section className={classes.Days}>
        { days.map(day => <DayBlock key={moment(day.date).unix()} {...day} />) }
      </section>
    </section>
  );
}

function mapStateToProps(state) {
  const { forecast, ui: { query } } = state;

  return {
    ...forecast,
    query,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goToSearch: () => dispatch(hideResults()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsView);

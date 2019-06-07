// @flow

import React from 'react';
import { connect } from 'react-redux';

import { hideResults } from '../../store/actions/ui';

import TEMP_MODES from '../../data/TEMP_MODES';

import type { ForecastDay } from '../../types/ForecastDay';
import type { ForecastCurrent } from '../../types/ForecastCurrent';

import DayBlock from '../DayBlock';
import TempModeToggle from '../TempModeToggle';

type Props = {
  current: ForecastCurrent,
  days: Array<ForecastDay>,
  mode: String,
  goToSearch: Function,
}

function ResultsView(props: Props) {
  const {
    goToSearch, current, days, mode,
  } = props;

  const { tempC, tempF } = current;

  const temp = mode === TEMP_MODES.C ? tempC : tempF;

  return (
    <section>
      <button type="button" onClick={goToSearch}>Back</button>
      <TempModeToggle />
      { `It's ${temp} here right now.` }
      { days.map(day => <DayBlock key={day.date.unix()} {...day} />) }
    </section>
  );
}

function mapStateToProps(state) {
  const { forecast, ui: { mode } } = state;

  return {
    ...forecast,
    mode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goToSearch: () => dispatch(hideResults()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsView);

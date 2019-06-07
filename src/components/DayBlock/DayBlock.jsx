// @flow

import { connect } from 'react-redux';

import TEMP_MODES from '../../data/TEMP_MODES';

import type { ForecastDay } from '../../types/ForecastDay';

type Props = ForecastDay & {
  mode: String,
}

function DayBlock(props: Props) {
  const {
    date, avgTempC, avgTempF, mode,
  } = props;

  const temp = mode === TEMP_MODES.C ? avgTempC : avgTempF;

  return `On ${date.format('dddd')} it will be ${temp}. `;
}

function mapStateToProps(state) {
  const { ui: { mode } } = state;

  return {
    mode,
  };
}

export default connect(mapStateToProps)(DayBlock);

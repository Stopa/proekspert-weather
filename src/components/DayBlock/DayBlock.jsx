// @flow

import React from 'react';
import moment from 'moment';

import classes from './DayBlock.module.scss';

import type { ForecastDay } from '../../types/ForecastDay';

import WeatherConditionIcon from '../WeatherConditionIcon';

import useTemp from '../../hooks/useTemp';

type Props = ForecastDay;

export default function DayBlock(props: Props) {
  const {
    date, avgTempC, avgTempF, conditionCode,
  } = props;

  const temperature = useTemp(avgTempC, avgTempF);

  return (
    <article className={classes.DayBlock}>
      <time dateTime={date}>{ moment(date).format('dddd') }</time>
      <span className={classes.icon}>
        <WeatherConditionIcon code={conditionCode} />
      </span>
      { temperature }
    </article>
  );
}

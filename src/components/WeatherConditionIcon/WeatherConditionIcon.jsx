// @flow

import React from 'react';

import conditions from '../../data/weather-conditions.json';

type Props = {
  code: Number,
}

export default function WeatherConditionIcon(props: Props) {
  const { code } = props;

  const condition = conditions[code];

  if (!condition) {
    throw new Error('Invalid condition code provided.');
  }

  return (
    <i
      aria-label={condition.description}
      title={condition.description}
      className={`wi ${condition.icon}`}
    />
  );
}

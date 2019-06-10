// @flow

import React from 'react';

import classes from './LoadingIndicator.module.scss';

export default function LoadingIndicator() {
  return <div className={`material-icons ${classes.LoadingIndicator}`} aria-label="Loading">sync</div>;
}

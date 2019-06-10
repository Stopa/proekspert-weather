// @flow

import React from 'react';

import classes from './ErrorContainer.module.scss';

type Props = {
  message: string,
}

export default function ErrorContainer(props: Props) {
  const { message } = props;

  return <div className={classes.ErrorContainer}>{ message }</div>;
}

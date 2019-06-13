// @flow

/**
 * Flow suppression as it doesn't seem to support React Hooks in my version
 */
// $FlowFixMe
import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import classes from './TempModeToggle.module.scss';

import { setMode } from '../../store/actions/ui';

import TEMP_MODES from '../../data/TEMP_MODES';

type Props = {
  mode: string,
  changeMode: Function,
}

function TempModeToggle(props: Props) {
  const { mode, changeMode } = props;

  const keys = Object.keys(TEMP_MODES);

  const otherOptionKey = keys.find(option => TEMP_MODES[option] !== mode);

  if (otherOptionKey === undefined) {
    throw new Error('Cannot find a temperature mode to toggle to.');
  }

  const otherOption = TEMP_MODES[otherOptionKey];

  const clickListener = useCallback(() => {
    changeMode(otherOption);
  }, [changeMode, otherOption]);

  const buttonClasses = [classes.TempModeToggle];

  if (mode === TEMP_MODES[keys[1]]) {
    buttonClasses.push(classes.TempModeToggleActive);
  }

  return (
    <button
      type="button"
      className={buttonClasses.join(' ')}
      onClick={clickListener}
      aria-label={`Show temperature in °${otherOption}`}
    >
      <span className={classes.Inner}>
        <span>
          { `°${TEMP_MODES[keys[0]]}` }
        </span>
        <span className={classes.Handle} />
        <span>
          { `°${TEMP_MODES[keys[1]]}` }
        </span>
      </span>
    </button>
  );
}

function mapStateToProps(state) {
  const { ui: { mode } } = state;

  return {
    mode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeMode: mode => dispatch(setMode(mode)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TempModeToggle);

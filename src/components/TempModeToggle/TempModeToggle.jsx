// @flow

/**
 * Flow suppression as it doesn't seem to support React Hooks in my version
 */
// $FlowFixMe
import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import { setMode } from '../../store/actions/ui';

import TEMP_MODES from '../../data/TEMP_MODES';

type Props = {
  mode: string,
  changeMode: Function,
}

function TempModeToggle(props: Props) {
  const { mode, changeMode } = props;

  const toggleMode = useCallback(() => {
    const otherOptionKey = Object.keys(TEMP_MODES).find(option => TEMP_MODES[option] !== mode);

    if (otherOptionKey === undefined) {
      throw new Error('Cannot find a temperature mode to toggle to.');
    }

    const otherOption = TEMP_MODES[otherOptionKey];

    changeMode(otherOption);
  }, [changeMode, mode]);

  return (
    <button type="button" onClick={toggleMode}>{ mode }</button>
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

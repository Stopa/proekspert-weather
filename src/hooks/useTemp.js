// @flow

import { useSelector } from 'react-redux';

import TEMP_MODES from '../data/TEMP_MODES';

/**
 * A custom React-Redux Hook for formatting temperature.
 *
 * @param {number} c Temperature in degrees Celsius
 * @param {number} f Temperature in degrees Fahrenheit
 * @returns {string} Formatted temperature string with the right measurement attached.
 */
export default function useTemp(c, f) {
  const mode = useSelector(state => state.ui.mode);

  const temp = mode === TEMP_MODES.C ? c : f;

  return `${temp}°${mode}`;
}

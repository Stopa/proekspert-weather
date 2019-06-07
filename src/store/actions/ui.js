// @flow

import TEMP_MODES from '../../data/TEMP_MODES';

export const SET_QUERY = 'SET_QUERY';

export function setQuery(query: ?string) {
  return {
    type: SET_QUERY,
    payload: {
      query,
    },
  };
}

export const SET_ERROR = 'SET_ERROR';

export function setError(message: string) {
  return {
    type: SET_ERROR,
    payload: {
      message,
    },
  };
}

export const SET_MODE = 'SET_MODE';

export function setMode(mode: string) {
  if (!Object.keys(TEMP_MODES).includes(mode)) {
    throw new Error(`Invalid temperature mode provided: ${mode}`);
  }

  return {
    type: SET_MODE,
    payload: {
      mode,
    },
  };
}

export const SHOW_RESULTS = 'SHOW_RESULTS';

export function showResults() {
  return {
    type: SHOW_RESULTS,
  };
}

export const HIDE_RESULTS = 'HIDE_RESULTS';

export function hideResults() {
  return {
    type: HIDE_RESULTS,
  };
}

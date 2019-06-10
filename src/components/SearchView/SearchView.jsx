// @flow

/**
 * Flow suppression as it doesn't seem to support React Hooks in my version
 */
// $FlowFixMe
import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import classes from './SearchView.module.scss';

import { setQuery, setError } from '../../store/actions/ui';
import { fetchForecast } from '../../store/actions/forecast';

type Props = {
  query: string,
  changeQuery: Function,
  doSearch: Function,
  doSetError: Function,
}

function SearchView(props: Props) {
  const {
    query, changeQuery, doSearch, doSetError,
  } = props;

  const changeListener = useCallback((event) => {
    changeQuery(event.currentTarget.value);
  }, [changeQuery]);

  const submitListener = useCallback((event) => {
    event.preventDefault();

    doSearch();
  }, [doSearch]);

  const geolocationSuccess = useCallback((position) => {
    const { coords: { latitude, longitude } } = position;

    changeQuery([latitude, longitude].join(','));

    doSearch();
  }, [changeQuery, doSearch]);

  const geolocationError = useCallback(() => {
    doSetError('Could not get current position');
  }, [doSetError]);

  const gpsButtonClickListener = useCallback(() => {
    if (!navigator || !navigator.geolocation) {
      setError('Your browser does not support geolocation.');

      return null;
    }

    navigator.geolocation.getCurrentPosition(
      geolocationSuccess,
      geolocationError,
    );

    return null;
  }, [geolocationSuccess, geolocationError]);

  return (
    <form action="#" onSubmit={submitListener} className={classes.SearchForm}>
      <div className={classes.SearchForm_control}>
        <input type="search" placeholder="City" aria-label="Enter your location" value={query || ''} onChange={changeListener} />
        <button type="submit" className="material-icons">search</button>
      </div>
      or
      <button type="button" className={classes.SearchForm_gps} onClick={gpsButtonClickListener}>
        use my
        {' '}
        <u>current position</u>
      </button>
    </form>
  );
}

function mapStateToProps(state) {
  const { ui: { query } } = state;

  return {
    query,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeQuery: query => dispatch(setQuery(query)),
    doSearch: () => dispatch(fetchForecast()),
    doSetError: message => dispatch(setError(message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);

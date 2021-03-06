// @flow

import React from 'react';
import { connect } from 'react-redux';

import classes from './AppContainer.module.scss';

import LoadingIndicator from '../LoadingIndicator';
import ErrorContainer from '../ErrorContainer';
import SearchView from '../SearchView';
import ResultsView from '../ResultsView';

type Props = {
  loading: boolean,
  showResults: Boolean,
  error: ?String,
}

function AppContainer(props: Props) {
  const { showResults, loading, error } = props;

  return (
    <main className={classes.AppContainer}>
      { loading && <LoadingIndicator /> }
      { error && <ErrorContainer message={error} /> }
      {
        showResults
          ? <ResultsView />
          : <SearchView />
      }
    </main>
  );
}

function mapStateToProps(state) {
  const { ui: { loading, showResults, error } } = state;

  return {
    showResults,
    loading,
    error,
  };
}

export default connect(mapStateToProps)(AppContainer);

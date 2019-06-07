// @flow

/**
 * Flow suppression as it doesn't seem to support React Hooks in my version
 */
// $FlowFixMe
import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import { setQuery, fetchForecast } from '../../store/actions/ui';

type Props = {
  query: string,
  changeQuery: Function,
  doSearch: Function,
}

function SearchView(props: Props) {
  const { query, changeQuery, doSearch } = props;

  const changeListener = useCallback((event) => {
    changeQuery(event.currentTarget.value);
  }, [changeQuery]);

  const submitListener = useCallback((event) => {
    event.preventDefault();

    doSearch();
  }, [doSearch]);

  return (
    <form action="#" onSubmit={submitListener}>
      <input type="text" value={query || ''} onChange={changeListener} />
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);

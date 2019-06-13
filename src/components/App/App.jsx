// @flow

/**
 * Flow suppression as it doesn't seem to support React Hooks in my version
 */
// $FlowFixMe
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import store from '../../store';

import { restoreForecastFromCache, appCacheKey } from '../../store/actions/forecast';

import AppContainer from '../AppContainer';

function App() {
  // Check for previously saved forecast in localStorage
  useEffect(() => {
    const cache = JSON.parse(window.localStorage.getItem(appCacheKey));

    if (cache !== null) {
      store.dispatch(restoreForecastFromCache(cache));
    }
  }, []);

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;

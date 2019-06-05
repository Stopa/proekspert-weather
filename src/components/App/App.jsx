// @flow

import React from 'react';
import { Provider } from 'react-redux';

import './App.css';

import store from '../../store';

function App() {
  return (
    <Provider store={store}>
      <h1>The weather is probably alright</h1>
    </Provider>
  );
}

export default App;

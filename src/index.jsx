// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import App from './components/App';

const root = document.getElementById('root');

if (root) {
  ReactDOM.render(<App />, root);
} else {
  throw new Error('Root element not found.');
}

import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './ui/vendor.scss';
import './icons';

import configureStore from './store';
const store = configureStore();

import App from 'components/layout/App.jsx';

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('app'));
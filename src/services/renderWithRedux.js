import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

const renderWithRedux = (
  component,
  {
    store = createStore(rootReducer, applyMiddleware(thunk)),
  } = {},
) => ({
  ...render(<Provider store={store}>{component}</Provider>),
  store,
});

export default renderWithRedux;

import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

test('renders learn react link', () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>);
  const linkElement = getByText(/STAR WARS PLANETS/i);
  expect(linkElement).toBeInTheDocument();
});

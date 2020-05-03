import React from 'react';
import renderWithRedux from './services/renderWithRedux';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = renderWithRedux(<App />);
  const reduxText = getByText(/Redux Starwars/i);
  expect(reduxText).toBeInTheDocument();
});

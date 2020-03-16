import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

test('renders app', () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>);
  const linkElement = getByText('Orbital Period');
  expect(linkElement).toBeInTheDocument();
});

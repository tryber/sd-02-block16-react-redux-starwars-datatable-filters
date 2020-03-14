import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import '@testing-library/jest-dom/extend-expect';

test('renders the title', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const titleElement = getByText(/starwars datatable with filters/i);
  expect(titleElement).toBeInTheDocument();
});

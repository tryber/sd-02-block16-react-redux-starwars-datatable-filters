import React from 'react';
import './App.css';

import Table from './components/Table';
import Request from './components/Request';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <header className="App-header">
          <Request />
          <Table />
        </header>
      </Provider>
    </div>
  );
}

export default App;

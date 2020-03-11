import React from 'react';
import './App.css';

import Table from './components/Table';
import Request from './components/Request';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store} className="App">
      <div className="App">
        <Request />
        <Table />
      </div>
    </Provider>
  );
}

export default App;

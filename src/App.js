import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import Table from './components/Table';
import SWAPI from './services/SWAPI';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <SWAPI />
        <Table />
      </Provider>
    </div>
  );
}

export default App;

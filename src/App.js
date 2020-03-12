import React from 'react';
import './App.css';

import Table from './components/Table';
import Request from './components/Request';
import { Provider } from 'react-redux';
import { store } from './store';
import FilterName from './components/FilterName';
import FilterNumericValues from './components/FilterNumericValues';

function App() {
  return (
    <Provider store={store} className="App">
      <div className="App">
        <h1>StarWars Datatable with Filters</h1>
        <Request />
        <FilterName />
        <FilterNumericValues />
        <Table />
      </div>
    </Provider>
  );
}

export default App;

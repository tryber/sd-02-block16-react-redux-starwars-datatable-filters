import React from 'react';
import './App.css';

import Table from './components/Table';
import Request from './components/Request';
import FilterName from './components/FilterName';
import FilterNumericValues from './components/FilterNumericValues';

function App() {
  return (
    <div className="App">
      <h1>StarWars Datatable with Filters</h1>
      <Request />
      <FilterName />
      <FilterNumericValues />
      <Table />
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';

import Table from './components/Table';
import NameFilter from './components/NameFilter';
import NumericValuesFilters from './components/NumericValuesFilters';

function App() {
  return (
    <div className="App">
      <h1>StarWars Datatable with Filters</h1>
      <NameFilter />
      <NumericValuesFilters />
      <Table />
    </div>
  );
}

export default App;

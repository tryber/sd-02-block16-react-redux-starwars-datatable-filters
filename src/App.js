import React from 'react';
import Table from './components/Table';
import Filters from './components/Filters';
import SavedFilters from './components/SavedFilters';

function App() {
  return (
    <div className="App">
      <div className="mainContainer">
        <Filters />
        <SavedFilters />
        <Table />
      </div>
    </div>
  );
}

export default App;

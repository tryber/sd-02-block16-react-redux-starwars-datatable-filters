import React from 'react';
import Table from './components/Table';
import Filters from './components/Filters';

function App() {
  return (
    <div className="App">
      <div className="mainContainer">
        <Filters />
        <Table />
      </div>
    </div>
  );
}

export default App;

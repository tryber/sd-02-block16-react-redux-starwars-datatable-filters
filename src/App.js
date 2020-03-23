import React from 'react';
import './App.css';

import Table from './components/Table';
import Filters from './components/Filters';

function App() {
  return (
    <div className="App">
      <Filters />
      <Table />
    </div>
  );
}

export default App;

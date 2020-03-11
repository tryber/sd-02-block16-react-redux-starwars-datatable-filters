import React from 'react';
import './App.css';

import { NameFilter, Table, NumberFilter } from './components';


function App() {
  return (
    <div className="App">
      <NameFilter />
      <NumberFilter />
      <Table />
    </div>
  );
}

export default App;

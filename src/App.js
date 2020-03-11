import React from 'react';
import './App.css';
import Table from './Components/Table';

import InputName from './Components/InputName';
import Filter from './Components/Filter';

function App() {
  return (
    <div className="App">
      <InputName />
      <Filter />
      <Table />
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import Table from './Components/Table';
import FilterByName from './Components/FilterByName';
import FilterByCondition from './Components/FilterByCondition';
import Input from './Components/Input';

function App() {
  return (
    <div className="App">
      <FilterByName />
      <FilterByCondition />
      <Input />
      <Table />
    </div>
  );
}

export default App;

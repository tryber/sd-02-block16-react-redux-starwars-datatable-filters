import React from 'react';
import './App.css';
import Table from './components/Table';
import Inputs from './components/Inputs';
import Selectors from './components/Selectors';

function App() {
  return (
    <div className="App">
      <div>Star Wars</div>
      <Inputs />
      <Selectors />
      <Table />
    </div>
  );
}

export default App;

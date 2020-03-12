import React from 'react';
import './App.css';
import Table from './Components/Table';

import Filtragem from './Components/Filtragem';
import InputName from './Components/InputName';


function App() {
  return (
    <div className="App">
      <InputName />
      <Filtragem />
      <Table />
    </div>
  );
}

export default App;

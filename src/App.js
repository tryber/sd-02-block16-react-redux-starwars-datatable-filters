import React from 'react';
import Table from './components/Table';
import getPlanets from './components/Request';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Table />
      </header>
    </div>
  );
}

export default App;

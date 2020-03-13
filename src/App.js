import React from 'react';
import Table from './components/Table';
import Title from './components/Title';
import './styles/App_father.css';

function App() {
  return (
    <div>
      <div className="App_father">
        <Title />
      </div>
      <Table />
    </div>
  );
}

export default App;

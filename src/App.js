import React from 'react';
import Table from './components/Table';
import store from './store/store';

function App() {
  return (
    <Table planetsData={store} />
  );
}

export default App;

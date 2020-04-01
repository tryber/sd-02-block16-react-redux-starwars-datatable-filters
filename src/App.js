import React from 'react';
import { Provider } from 'react-redux';
import Table from './components/Table';
import './App.css';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Table />
        </header>
      </div>
    </Provider>
  );
}

export default App;

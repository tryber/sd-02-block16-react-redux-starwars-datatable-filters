import React from 'react';
import starWarsLogo from './images/sw_logo.png';
import './App.css';

import Table from './components/Table';

class App extends React.Component {
  render() {
    return (
      <div className="background">
        <header>
          <div>
            <img src={starWarsLogo} alt="star wars logo" className="sw-logo" />
          </div>
          <div>
            <h1 className="title">PLANETS TABLE</h1>
          </div>
        </header>
        <section>
          <Table />
        </section>
      </div>
    );
  }
}

export default App;

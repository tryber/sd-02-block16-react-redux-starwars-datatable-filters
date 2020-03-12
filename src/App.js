import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './components/Table';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Table />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(App);

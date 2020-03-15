import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import Table from './components/Table';
import NameFilter from './components/NameFilter';
import NumericValuesFilters from './components/NumericValuesFilters';

class App extends Component {
  render() {
    const { isLoading } = this.props;
    return (
      <div className="App">
        <h1>StarWars Datatable with Filters</h1>
        {isLoading && 'Loading...'}
        {!isLoading && <NameFilter />}
        {!isLoading && <NumericValuesFilters />}
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.data.length <= 1,
});

export default connect(mapStateToProps)(App);

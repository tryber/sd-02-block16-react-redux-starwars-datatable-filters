import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';

import Table from './components/Table';
import NameFilter from './components/NameFilter';
import NumericValuesFilters from './components/NumericValuesFilters';
import SortingSelection from './components/SortingSelection';

class App extends Component {
  render() {
    const { isLoading } = this.props;
    return (
      <div className="App">
        <h1>StarWars Datatable with Filters</h1>
        {isLoading && 'Loading...'}
        {!isLoading && <SortingSelection />}
        {!isLoading && <NameFilter />}
        {!isLoading && <NumericValuesFilters />}
        <Table />
      </div>
    );
  }
}

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.data.length <= 1,
});

export default connect(mapStateToProps)(App);

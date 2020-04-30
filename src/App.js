import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import InputFilter from './components/InputFilter';
import OrdenadorDeColunas from './components/OrdenadorDeColunas';
import FiltersDropdown from './components/FiltersDropdown';
import ExibeDiv from './components/ExibeDiv';
import Table from './components/Table';
import './App.css';

class App extends React.Component {
  render() {
    const { isLoading, error } = this.props;
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
      <div className="App">
        <header className="App-header">
          <InputFilter />
          <OrdenadorDeColunas />
          <FiltersDropdown />
          <ExibeDiv />
          <Table />
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.data.isLoading,
  error: state.data.error,
});

App.propTypes = {
  isLoading: propTypes.bool.isRequired,
  error: propTypes.bool.isRequired,
};
export default connect(mapStateToProps)(App);

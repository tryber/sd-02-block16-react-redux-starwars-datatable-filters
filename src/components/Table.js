import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkPlanets } from '../actions/APIactions';
import './Table.css';

class Table extends Component {
  componentDidMount() {
    const { importedThunk } = this.props;
    importedThunk();
  }

  render() {
    return (
      <div>
        <h1>Star Wars - A New Saga begins!</h1>
      </div>
    );
  }
}

const mapStateToProps = ({
  APIreducer: {
    loading,
    data,
    error,
  },
}) => ({
  loading, data, error,
});

const mapDispatchToProps = (dispatch) => ({
  importedThunk: () => dispatch(thunkPlanets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  importedThunk: propTypes.func.isRequired,
};

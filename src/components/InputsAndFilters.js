import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  filterPlanetsWithName,
  columnValue,
  comparativeValue,
  numberValue,
} from '../actions';

import '../styles/InputsAndFilters_stylish.css';

const columns = [
  '-',
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const comparativeValues = [
  '-',
  'bigger_than',
  'less_than',
  'equal_to',
];

const NameInput = (planetsData, dispatchFilter) => (
  <input
    type="text"
    placeholder="Search a name"
    onChange={(userInfo) => dispatchFilter(planetsData, userInfo.target.value)}
  />
);

const NumberInput = (dispatchNumber) => (
  <input
    type="number"
    placeholder="Search a number"
    onChange={(e) => dispatchNumber(e.target.value)}
  />
);

class InputsAndFilters extends React.Component {
  render() {
    const {
      planetsData,
      dispatchFilter,
      dispatchColumns,
      dispatchComparative,
      dispatchNumber,
    } = this.props;
    return (
      <div className="InputsAndFilters_stylish">

        {NameInput(planetsData, dispatchFilter)}

        <div className="InputsAndFilters_selectors">
          <select key={`${columns.length}`} onChange={(e) => dispatchColumns(e.target.value)}>
            {columns.map((keyValue) => (
              <option key={keyValue} value={keyValue}>{keyValue}</option>
            ))}
          </select>
          <select key={`${comparativeValues.length}`} onChange={(e) => dispatchComparative(e.target.value)}>
            {comparativeValues.map((keyValue) => (
              <option key={keyValue} value={keyValue}>{keyValue}</option>
            ))}
          </select>

          {NumberInput(dispatchNumber)}

          <button type="button">Search</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchFilter: (planetsData, userInfo) => (
    dispatch(filterPlanetsWithName(planetsData, userInfo))
  ),
  dispatchColumns: (userInfo) => (
    dispatch(columnValue(userInfo))
  ),
  dispatchComparative: (userInfo) => (
    dispatch(comparativeValue(userInfo))
  ),
  dispatchNumber: (userInfo) => (
    dispatch(numberValue(userInfo))
  ),
});

InputsAndFilters.propTypes = {
  planetsData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    rotation_period: PropTypes.string,
    orbital_period: PropTypes.string,
    diameter: PropTypes.string,
    climate: PropTypes.string,
    gravity: PropTypes.string,
    terrain: PropTypes.string,
    surface_water: PropTypes.string,
    population: PropTypes.string,
    films: PropTypes.array,
    created: PropTypes.string,
    edited: PropTypes.string,
    url: PropTypes.string,
  })),
  dispatchFilter: PropTypes.func.isRequired,
  dispatchColumns: PropTypes.func.isRequired,
  dispatchComparative: PropTypes.func.isRequired,
  dispatchNumber: PropTypes.func.isRequired,
};

InputsAndFilters.defaultProps = {
  planetsData: [],
};


export default connect(null, mapDispatchToProps)(InputsAndFilters);

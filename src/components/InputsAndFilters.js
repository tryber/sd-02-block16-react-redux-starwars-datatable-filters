import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterPlanetsWithName } from '../actions';
import '../styles/InputsAndFilters_stylish.css';

const columns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const comparativeValues = [
  'bigger_than',
  'less_than',
  'equal_to',
];

const imprimir = (value, other) => (
  console.log(value, other)
);

const SelectorColumns = (array) => (
  <select key={`${array.length}`} onChange={(selector) => imprimir(selector.target.value, array)}>
    {array.map((keyValue) => (
      <option key={keyValue} value={keyValue}>{keyValue}</option>
    ))}
  </select>
);

const SelectorComparative = (array) => (
  <select key={`${array.length}`} onChange={(selector) => imprimir(selector.target.value, array)}>
    {array.map((keyValue) => (
      <option key={keyValue} value={keyValue}>{keyValue}</option>
    ))}
  </select>
);


class InputsAndFilters extends React.Component {
  render() {
    const { planetsData, dispatchFilter } = this.props;
    return (
      <div className="InputsAndFilters_stylish">
        <input
          type="text"
          placeholder="Search a name"
          onChange={(userInfo) => dispatchFilter(planetsData, userInfo.target.value)}
        />
        <div className="InputsAndFilters_selectors">
          {SelectorColumns(columns)}
          {SelectorComparative(comparativeValues)}
          <input
            type="number"
            placeholder="Search a number"
          />
        </div>
        <button type="button">Search</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchFilter: (planetsData, userInfo) => (
    dispatch(filterPlanetsWithName(planetsData, userInfo))
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
};

InputsAndFilters.defaultProps = {
  planetsData: [],
};


export default connect(null, mapDispatchToProps)(InputsAndFilters);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  filterPlanetsWithName,
  filterPlanetsWithNumber,
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

const NumberInput = () => (
  <input
    type="number"
    placeholder="Search a number"
  />
);

class InputsAndFilters extends React.Component {
  render() {
    const {
      planetsData,
      dispatchFilter,
      dispatchNumberFilter,
    } = this.props;
    return (
      <div className="InputsAndFilters_stylish">

        {NameInput(planetsData, dispatchFilter)}

        <div className="InputsAndFilters_selectors">
          <select key={`${columns.length}`}>
            {columns.map((keyValue) => (
              <option key={keyValue} value={keyValue}>{keyValue}</option>
            ))}
          </select>
          <select key={`${comparativeValues.length}`}>
            {comparativeValues.map((keyValue) => (
              <option key={keyValue} value={keyValue}>{keyValue}</option>
            ))}
          </select>

          {NumberInput()}

          <button
            className="InputsAndFilters_button"
            type="button"
            onClick={(button) => dispatchNumberFilter(button.target)}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchFilter: (planetsData, userInfo) => (
    dispatch(filterPlanetsWithName(planetsData, userInfo))
  ),
  dispatchNumberFilter: (buttonTag) => (
    dispatch(filterPlanetsWithNumber(buttonTag))
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
  dispatchNumberFilter: PropTypes.func.isRequired,
};

InputsAndFilters.defaultProps = {
  planetsData: [],
};


export default connect(null, mapDispatchToProps)(InputsAndFilters);

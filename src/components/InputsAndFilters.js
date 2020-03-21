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


const NameInput = (planetsData, dispatchFilter) => {
  return (
    <input
      type="text"
      name="value"
      placeholder="Search a name"
      onChange={(userInfo) => dispatchFilter(planetsData, userInfo.target.value)}
    />
  );
};

class InputsAndFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      column: '',
      comparison: '',
      value: '',
    };
  }

  setStateFunc(param) {
    const { value, name } = param;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    const { column, comparison, value } = this.state;
    const { dispatchNumberFilter, planetsData } = this.props;
    dispatchNumberFilter(column, comparison, value, planetsData);
  }

  NumberInput() {
    return (
      <input
        type="number"
        name="value"
        placeholder="Search a number"
        onChange={(element) => this.setStateFunc(element.target)} // refatorar
      />
    );
  }

  render() {
    const {
      planetsData,
      dispatchFilter,
    } = this.props;

    return (
      <div className="InputsAndFilters_stylish">

        {NameInput(planetsData, dispatchFilter)}

        <div className="InputsAndFilters_selectors">
          <select
            key={`${columns.length}`}
            name="column"
            onChange={(element) => this.setStateFunc(element.target)} // refatorar
          >
            {columns.map((keyValue) => (
              <option key={keyValue} value={keyValue}>{keyValue}</option>
            ))}
          </select>
          <select
            name="comparison"
            onChange={(element) => this.setStateFunc(element.target)} // refatorar
            key={`${comparativeValues.length}`}>
            {comparativeValues.map((keyValue) => (
              <option key={keyValue} value={keyValue}>{keyValue}</option>
            ))}
          </select>

          {this.NumberInput()}

          <button
            className="InputsAndFilters_button"
            type="button"
            onClick={() => this.handleSubmit()}
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
  dispatchNumberFilter: (column, comparison, value, planetsData) => {
    if (value <= 0 || comparison === '-' || column === '-') {
      alert('Fill in all fields to continue.');
      return '';
    }
    return (
      dispatch(filterPlanetsWithNumber(column, comparison, value, planetsData))
    );
  },
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

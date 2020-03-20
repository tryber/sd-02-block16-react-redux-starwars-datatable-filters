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

const NumberInput = () => (
  <input
    type="number"
    placeholder="Search a number"
  />
);

const NameInput = (planetsData, dispatchFilter) => {
  return (
    <input
      type="text"
      placeholder="Search a name"
      onChange={(userInfo) => dispatchFilter(planetsData, userInfo.target.value)}
    />
  );
};

class InputsAndFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: {
        name: '',
      },
      numbersInput: {
        numericFilters: {
          column: '',
          comparison: '',
          value: '',
        },
      },
    };
  }

  teste(input) {
    console.log(this.state);
    this.setState({
      nameInput: input,
    });
  }

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
          <select
            onChange={(element) => this.teste({ name: element.target.value })}
            key={`${columns.length}`}
          >
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
            onClick={(button) => dispatchNumberFilter(button.target, planetsData)}
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
  dispatchNumberFilter: (buttonTag, filteredData, planetsData) => {
    const userInputName = buttonTag.previousElementSibling;
    const comparison = userInputName.previousElementSibling;
    const tableColumn = comparison.previousElementSibling;
    console.log(userInputName.value);
    if (userInputName.value.length === 0 || comparison.value === '-' || tableColumn.value === '-') {
      alert('Fill in all fields to continue.');
      return '';
    }
    return (
      dispatch(filterPlanetsWithNumber(buttonTag, filteredData, planetsData))
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

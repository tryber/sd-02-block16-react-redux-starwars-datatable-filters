import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  filterPlanetsWithName,
  filterPlanetsWithNumber,
} from '../actions';
import '../styles/InputsAndFilters_stylish.css';

const comparativeValues = [
  '-',
  'bigger_than',
  'less_than',
  'equal_to',
];


const NameInput = (planetsData, dispatchFilter) => (
  <input
    type="text"
    name="value"
    placeholder="Search a name"
    onChange={(userInfo) => dispatchFilter(planetsData, userInfo.target.value)}
  />
);

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

  filterNumbersComponent(columns) {
    return (
      <div className="InputsAndFilters_selectors">
        <select
          key={`${columns.length}`}
          name="column"
          onChange={(element) => this.setStateFunc(element.target)} // refatorar
        >
          {columns.map((column) => (
            <option key={column} value={column}>{column}</option>
          ))}
        </select>

        <select
          name="comparison"
          onChange={(element) => this.setStateFunc(element.target)} // refatorar
          key={`${comparativeValues.length}`}
        >
          {comparativeValues.map((comparativeValue) => (
            <option key={comparativeValue} value={comparativeValue}>{comparativeValue}</option>
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
    );
  }

  render() {
    const {
      planetsData,
      dispatchFilter,
      columnsSelect,
    } = this.props;
    console.log(columnsSelect);
    return (
      <div className="InputsAndFilters_stylish">

        {NameInput(planetsData, dispatchFilter)}
        {this.filterNumbersComponent(columnsSelect)}

      </div>
    );
  }
}

const mapStateToProps = (
  {
    returnInitialAPI: { planetsData },
    returnFilterData: { filteredData, columnsSelect },
  },
) => ({
  planetsData,
  filteredData,
  columnsSelect,
});

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
  planetsData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  dispatchFilter: PropTypes.func.isRequired,
  dispatchNumberFilter: PropTypes.func.isRequired,
  columnsSelect: PropTypes.arrayOf(PropTypes.string).isRequired,
};

InputsAndFilters.defaultProps = {
  planetsData: [],
};


export default connect(mapStateToProps, mapDispatchToProps)(InputsAndFilters);

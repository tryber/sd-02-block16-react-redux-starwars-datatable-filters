import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  filterPlanetsWithName,
  filterNumbers,
} from '../actions';
import '../styles/InputsAndFilters_stylish.css';

const comparativeValues = [
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

  handleSubmit(dispatchNumberFilter, columns) {
    const { column, comparison, value } = this.state;
    const condition = column.length <= 0 || comparison.length <= 0 || value <= 0
      ? alert('Fill the fields to continue')
      : dispatchNumberFilter(column, comparison, value, columns);
    this.setState({
      column: '',
    });
    return condition;
  }

  NumberInput() {
    return (
      <input
        type="number"
        name="value"
        placeholder="Search a number"
        onChange={(element) => this.setStateFunc(element.target)}
      />
    );
  }

  filterNumbersComponent(columns, dispatchNumberFilter) {
    return (
      <div className="InputsAndFilters_selectors">
        <select
          key="columnValue"
          name="column"
          onChange={(element) => this.setStateFunc(element.target)}
        >
          <option hidden>Select a Column</option>
          {columns.map((column) => (
            <option key={column} value={column}>{column}</option>
          ))}
        </select>
        <select
          name="comparison"
          onChange={(element) => this.setStateFunc(element.target)}
          key="comparativeValue"
        >
          <option hidden>Select a comparison</option>
          {comparativeValues.map((comparativeValue) => (
            <option key={comparativeValue} value={comparativeValue}>{comparativeValue}</option>
          ))}
        </select>
        {this.NumberInput()}
        <button
          className="InputsAndFilters_button"
          type="button"
          onClick={() => this.handleSubmit(dispatchNumberFilter, columns)}
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
      dispatchNumberFilter,
    } = this.props;
    return (
      <div className="InputsAndFilters_stylish">

        {NameInput(planetsData, dispatchFilter)}
        {this.filterNumbersComponent(columnsSelect, dispatchNumberFilter)}

      </div>
    );
  }
}

const mapStateToProps = (
  {
    allReducer: { planetsData, filteredData, columnsSelect },
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
  dispatchNumberFilter: (column, comparison, value, columns) => (
    dispatch(filterNumbers(column, comparison, value, columns))
  ),
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

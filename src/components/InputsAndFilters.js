import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  filterPlanetsWithName,
  filterPlanetsWithNumber,
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

  handleSubmit() {
    const { column, comparison, value } = this.state;
    const { dispatchNumberFilter, columnsSelect } = this.props;
    dispatchNumberFilter(column, comparison, value, columnsSelect);
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

  filterNumbersComponent(columns) {
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
  dispatchNumberFilter: (column, comparison, value, columnsSelect) => {
    if (value <= 0) {
      alert('Fill value or existing value to continue.');
      return '';
    }
    return (
      dispatch(filterPlanetsWithNumber(column, comparison, value, columnsSelect))
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

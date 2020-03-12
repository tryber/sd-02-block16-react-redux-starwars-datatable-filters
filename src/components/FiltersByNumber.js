import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FiltersByNumber extends Component {
  static compareValues(planets, column, comparison, value) {
    const operations = {
      lesserThan: (x, y) => x < y,
      equalsThan: (x, y) => x === y,
      higherThan: (x, y) => x > y,
    };

    const filteredPlanets = planets
      .filter((planet) => operations[comparison](Number(planet[column]), Number(value)));

    return filteredPlanets;
  }

  static renderColumnsOptions(selectors) {
    return (
      <>
        {selectors.map(([value, label]) => <option key={`${label}_selector`} value={value}>{label}</option>)}
      </>
    );
  }

  static renderComparisonOptions() {
    return (
      <>
        <option label="null" value="" />
        <option value="lesserThan">{'<'}</option>
        <option value="equalsThan">=</option>
        <option value="higherThan">{'>'}</option>
      </>
    );
  }

  static numberFilterDispatch(event, rowIndex) {
    const STORE_COLUMN_FILTER = 'STORE_COLUMN_FILTER';
    const STORE_COMPARISON_FILTER = 'STORE_COMPARISON_FILTER';
    const STORE_VALUE_FILTER = 'STORE_VALUE_FILTER';
    const { target: { value } } = event;
    const switcher = {
      fields: () => ({ type: STORE_COLUMN_FILTER, value, rowIndex }),
      operator: () => ({ type: STORE_COMPARISON_FILTER, value, rowIndex }),
      number: () => ({ type: STORE_VALUE_FILTER, value, rowIndex }),
    };
    return switcher[event.target.id]();
  }

  constructor(props) {
    super(props);
    this.dispatchFilters = this.dispatchFilters.bind(this);
  }

  componentDidUpdate() {
    const {
      columnStatus,
      comparisonStatus,
      valueStatus,
    } = this.props;
    if (columnStatus && comparisonStatus && valueStatus) {
      const debounce = setTimeout(() => {
        this.dispatchFilters();
        clearTimeout(debounce);
      }, 800);
    }
  }

  getFilterValues() {
    const {
      data, selectors, numericValues, filterCount,
    } = this.props;
    let filteredData = data;
    const filteredPlanets = filterCount.map((col, index) => {
      const { column, comparison, value } = numericValues[index].numericValues;
      console.log(column, comparison, value);
      filteredData = FiltersByNumber.compareValues(
        filteredData, column, comparison, value,
      );
      return filteredData;
    });

    const { column } = numericValues[selectors.length - 1].numericValues;
    const filterSelectors = new Array(selectors[selectors.length - 1]
      .filter((option) => option[0] !== column));

    let newCount = 'x'.repeat(filterCount.length + 1);
    newCount = newCount.split('');

    return { filteredPlanets, filterSelectors, newCount };
  }

  dispatchFilters() {
    const {
      dispatch, selectors, numericValues,
    } = this.props;

    const { column, comparison, value } = numericValues[selectors.length - 1];
    const FILTER_BY_NUMBERS = 'FILTER_BY_NUMBER';
    const filterByNumbers = ({ filteredPlanets, filterSelectors, newCount }) => (
      {
        type: FILTER_BY_NUMBERS,
        filteredPlanets,
        filterSelectors,
        newCount,
        column,
        comparison,
        value,
      }
    );
    return dispatch(filterByNumbers(this.getFilterValues()));
  }

  render() {
    const { dispatch, selectors, filterCount } = this.props;
    return (
      <>
        { filterCount.map((item, rowIndex) => (
          <div key={`${item}_${rowIndex + 1}`}>
            <select
              onChange={(e) => dispatch(FiltersByNumber.numberFilterDispatch(e, rowIndex))}
              id="fields"
            >
              {FiltersByNumber.renderColumnsOptions(selectors[rowIndex])}
            </select>
            <select
              onChange={(e) => dispatch(FiltersByNumber.numberFilterDispatch(e, rowIndex))}
              id="operator"
            >
              {FiltersByNumber.renderComparisonOptions()}
            </select>
            <input
              onBlur={(e) => dispatch(FiltersByNumber.numberFilterDispatch(e, rowIndex))}
              type="number"
              id="number"
              width="100px"
            />
          </div>
        ))}
      </>
    );
  }
}

const mapStateToProps = ({ filterByNumericValue, filterByName, planetFetcher }) => {
  const { isFilteredByName } = filterByName;
  const {
    data: numberFilteredData,
    isFilteredByNumber,
    columnStatus, comparisonStatus, valueStatus,
    filters,
  } = filterByNumericValue;
  const { data: defaultData } = planetFetcher;
  const [{ filterCount }, { selectors }, numericValues] = filters;
  const returnProps = (dataSet) => ({
    numericValues,
    columnStatus,
    comparisonStatus,
    valueStatus,
    isFilteredByNumber,
    filterCount,
    selectors,
    data: dataSet,
  });

  return isFilteredByName ? returnProps(numberFilteredData) : returnProps(defaultData);
};

export default connect(mapStateToProps)(FiltersByNumber);

FiltersByNumber.propTypes = {
  numericValues: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  selectors: PropTypes.arrayOf(PropTypes.array).isRequired,
  filterCount: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  columnStatus: PropTypes.bool.isRequired,
  comparisonStatus: PropTypes.bool.isRequired,
  valueStatus: PropTypes.bool.isRequired,
};

FiltersByNumber.defaultProps = {
  data: [],
};

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

  static numberFilterDispatch(event, rowIndex) {
    const STORE_COLUMN_FILTER = 'STORE_COLUMN_FILTER';
    const STORE_COMPARISON_FILTER = 'STORE_COMPARISON_FILTER';
    const STORE_VALUE_FILTER = 'STORE_VALUE_FILTER';
    const REMOVE_FILTER = 'REMOVE_FILTER';
    const { target: { value } } = event;
    const switcher = {
      fields: () => ({ type: STORE_COLUMN_FILTER, value, rowIndex }),
      operator: () => ({ type: STORE_COMPARISON_FILTER, value, rowIndex }),
      number: () => ({ type: STORE_VALUE_FILTER, value, rowIndex }),
      remove: () => ({ type: REMOVE_FILTER, rowIndex }),
    };
    return switcher[event.target.id]();
  }

  constructor(props) {
    super(props);
    this.dispatchFilters = this.dispatchFilters.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      rowIndex,
      numericValues,
      // filterRowStatus: thisStatus,
    } = this.props;

    const {
      numericValues: prevNumericValues,
    } = prevProps;

    const thisNumericValue = numericValues[rowIndex] !== undefined
    && numericValues[rowIndex].numericValues;

    const {
      column,
      comparison,
      value,
      status: {
        column: thisColumStatus,
        comparison: thisComparisonStatus,
        value: thisValueStatus,
      },
    } = thisNumericValue;

    const oldNumericValues = prevNumericValues[rowIndex] !== undefined
    && prevNumericValues[rowIndex].prevNumericValues;

    const {
      status: {
        column: prevColumStatus,
        comparison: prevComparisonStatus,
        value: prevValueStatus,
      },
    } = oldNumericValues;

    if ((column !== '' && comparison !== '' && value !== '')
    && (thisColumStatus !== prevColumStatus
    && thisComparisonStatus !== prevComparisonStatus
    && thisValueStatus !== prevValueStatus)) {
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
      if (column !== '' && comparison !== '' && value !== '') {
        filteredData = FiltersByNumber.compareValues(
          filteredData, column, comparison, value,
        );
        return filteredData;
      }
      return filteredData.filter((dataChunk, dataIndex) => dataIndex !== index);
    });

    const { comparison, value, column } = numericValues[filterCount.length - 1].numericValues;
    const filterSelectors = new Array(selectors[filterCount.length - 1]
      .filter((option) => option[0] !== column));

    let newCount;

    if (column !== '' && comparison !== '' && value !== '') {
      newCount = 'x'.repeat(filterCount.length + 1).split('');
    } else {
      newCount = filterCount;
    }


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
    const {
      dispatch, selectors, filterCount, numericValues,
    } = this.props;
    return (
      <div>
        <FilterCount
          dispatch={dispatch}
          selectors={selectors}
          filterCount={filterCount}
          numericValues={numericValues}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ filterByNumericValue, filterByName, planetFetcher }) => {
  const { isFilteredByName } = filterByName;
  const {
    rowIndex,
    filterRowStatus,
    data: numberFilteredData,
    isFilteredByNumber,
    columnStatus, comparisonStatus, valueStatus,
    filters,
  } = filterByNumericValue;
  const { data: defaultData } = planetFetcher;
  const [{ filterCount }, { selectors }, numericValues] = filters;
  const returnProps = (dataSet) => ({
    rowIndex,
    filterRowStatus,
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


function FilterCount(props) {
  const {
    filterCount,
    dispatch,
    selectors,
    numericValues,
  } = props;

  const UPDATE_VALUE_STATUS = 'UPDATE_VALUE_STATUS';

  const onChange = (e, rowIndex) => (dispatch(FiltersByNumber.numberFilterDispatch(e, rowIndex)));

  function renderColumnsOptions(rowIndex, column) {
    return (
      <select
        onChange={(e) => onChange(e, rowIndex)}
        id="fields"
        value={column}
      >
        {selectors[rowIndex].map(([value, label]) => <option key={`${label}_selector`} value={value}>{label}</option>)}
      </select>
    );
  }

  function renderComparisonOptions(rowIndex, comparison) {
    return (
      <select
        onChange={(e) => onChange(e, rowIndex)}
        id="operator"
        value={comparison}
      >
        <option label=" " value="" defaultValue />
        <option value="lesserThan">{'<'}</option>
        <option value="equalsThan">=</option>
        <option value="higherThan">{'>'}</option>
      </select>

    );
  }

  function renderNumberInput(rowIndex, value) {
    return (
      <input
        onChange={(e) => onChange(e, rowIndex)}
        onBlur={() => value !== '' && dispatch({ type: UPDATE_VALUE_STATUS })}
        type="number"
        id="number"
        width="100px"
        value={value}
      />
    );
  }

  function renderRemoveButton(rowIndex) {
    return (
      <button
        type="button"
        onClick={(e) => onChange(e, rowIndex)}
        id="remove"
      >
        X
      </button>
    );
  }

  return (
    filterCount.map((item, rowIndex) => {
      const thisNumericValue = numericValues[rowIndex].numericValues;
      const { column, comparison, value } = thisNumericValue;
      return (
        <div key={`${item}_${rowIndex + 1}`}>
          {renderColumnsOptions(rowIndex, column)}

          {renderComparisonOptions(rowIndex, comparison)}

          {renderNumberInput(rowIndex, value)}

          {renderRemoveButton(rowIndex)}
        </div>
      );
    })
  );
}

export default connect(mapStateToProps)(FiltersByNumber);

FiltersByNumber.propTypes = {
  numericValues: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  rowIndex: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  selectors: PropTypes.arrayOf(PropTypes.array).isRequired,
  filterCount: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  filterRowStatus: PropTypes.bool.isRequired,
};

FiltersByNumber.defaultProps = {
  data: [],
};

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export const STORE_COLUMN_FILTER = 'STORE_COLUMN_FILTER';
export const STORE_COMPARISON_FILTER = 'STORE_COMPARISON_FILTER';
export const STORE_VALUE_FILTER = 'STORE_VALUE_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';

const numberFilterDispatch = (event, rowIndex) => {
  const { target: { value } } = event;
  const switcher = {
    fields: () => ({ type: STORE_COLUMN_FILTER, value, rowIndex }),
    operator: () => ({ type: STORE_COMPARISON_FILTER, value, rowIndex }),
    number: () => ({ type: STORE_VALUE_FILTER, value, rowIndex }),
    remove: () => ({ type: REMOVE_FILTER, rowIndex }),
  };
  return switcher[event.target.id]();
};


const FiltersByNumber = ({
  dispatch, selectors, filters,
}) => (
  <div>
    <FilterCount
      dispatch={dispatch}
      selectors={selectors}
      filters={filters}
    />
  </div>
);


const mapStateToProps = ({ filterByNumericValue }) => {
  const { selectors, filters } = filterByNumericValue;
  return {
    selectors,
    filters,
  };
};


function FilterCount(props) {
  const {
    dispatch,
    selectors,
    filters,
  } = props;

  const onChange = (e, rowIndex) => (dispatch(numberFilterDispatch(e, rowIndex)));

  function renderColumnsOptions(rowIndex, column) {
    return (
      <select
        onChange={(e) => onChange(e, rowIndex)}
        id="fields"
        value={column}
      >
        {selectors.map(([value, label]) => <option key={`${label}_selector`} value={value}>{label}</option>)}
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
    filters.map((item, rowIndex) => {
      const thisRowsFilter = filters[rowIndex];
      const { numericValues: { column, comparison, value } } = thisRowsFilter;

      return (
        <div key={`${item}_${rowIndex + 1}`}>
          {renderColumnsOptions(rowIndex, column)}

          {renderComparisonOptions(rowIndex, comparison)}

          {renderNumberInput(rowIndex, value)}

          {rowIndex !== 0 && renderRemoveButton(rowIndex)}
        </div>
      );
    })
  );
}

export default connect(mapStateToProps)(FiltersByNumber);

FiltersByNumber.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectors: PropTypes.arrayOf(PropTypes.array).isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

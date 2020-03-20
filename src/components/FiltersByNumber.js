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
  dispatch, filters,
}) => (
  <div>
    <FilterCount
      dispatch={dispatch}
      filters={filters}
    />
  </div>
);

function renderColumnsOptions(rowIndex, column, filters, onChange) {
  const selectors = [
    ['', '   '],
    ['population', 'Population'],
    ['orbital_period', 'Orbital period'],
    ['diameter', 'Diameter'],
    ['rotation_period', 'Rotation period'],
    ['surface_water', 'Surface water'],
  ];

  const usedColumns = filters.map(({ numericValues: { column: usedColumn } }) => usedColumn);

  const availableSelectors = selectors.filter((selector) => {
    const [selectorColumn, _name] = selector;
    return selectorColumn === '' || !(usedColumns.includes(selectorColumn)) || selectorColumn === column;
  });

  return (
    <select
      onChange={(e) => onChange(e, rowIndex)}
      id="fields"
      value={column}
      // value={selectors.find(([option, label]) => option === column)[1]}
    >
      {availableSelectors.map(([value, label]) => <option key={`${label}_selector`} value={value}>{label}</option>)}
    </select>
  );
}

function renderComparisonOptions(rowIndex, comparison, onChange) {
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

function renderNumberInput(rowIndex, value, onChange) {
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

function renderRemoveButton(rowIndex, onChange) {
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


function FilterCount(props) {
  const {
    dispatch,
    filters,
  } = props;

  const onChange = (e, rowIndex) => (dispatch(numberFilterDispatch(e, rowIndex)));

  return (
    filters.map((item, rowIndex) => {
      const { numericValues: { column, comparison, value } } = item;

      return (
        <div key={`${item}_${rowIndex + 1}`}>
          {renderColumnsOptions(rowIndex, column, filters, onChange)}

          {renderComparisonOptions(rowIndex, comparison, onChange)}

          {renderNumberInput(rowIndex, value, onChange)}

          { renderRemoveButton(rowIndex, onChange)}
        </div>
      );
    })
  );
}


const mapStateToProps = ({ filterByNumericValue }) => {
  const { filters } = filterByNumericValue;
  return {
    filters,
  };
};
// () => ({ type: STORE_COLUMN_FILTER, value, rowIndex })
// const mapDispatchToProps = (dispatch) => ({
//   xablau: (value, rowIndex) => dispatch(fields(value, rowIndex)),
// });

export default connect(mapStateToProps)(FiltersByNumber);

FiltersByNumber.propTypes = {
  dispatch: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

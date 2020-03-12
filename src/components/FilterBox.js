import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterButton, getRemoveFilter } from '../store/actions/table';

const FilterBox = ({
  setNewFilter, selectedValues, results, resultsByName, filters, removeFilter
}) => {
  const { column, comparison, value } = selectedValues;
  const [, ...numericValues] = filters;
  return (
    <div>
      {(column && comparison && value)
        ? <button
          type="button"
          onClick={() => setNewFilter(selectedValues, results, resultsByName)}
        >
          Clique para filtrar
        </button>
        : null}
      {!numericValues.length
        ? numericValues
        : numericValues.map(({ numeric_values }, i) => (
          <div key={numeric_values.column}>
            <button key={numeric_values.column} id={i} type="button" onClick={(e) => removeFilter(e, results)}>
              X
            </button>
            {`${numeric_values.column} | ${numeric_values.comparison} | ${numeric_values.value}`}
          </div>
        ))}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setNewFilter: (selectedValues, results, resultsByName) => dispatch(
    filterButton(selectedValues, results, resultsByName),
  ),
  removeFilter: (e, results) => dispatch(getRemoveFilter(e, results)),
});

const mapStateToProps = ({
  selectors: {
    selectedValues,
  },
  data: {
    results,
  },
  table: {
    resultsByName,
    filters,
  },
}) => ({
  selectedValues,
  results,
  resultsByName,
  filters,
});

FilterBox.propTypes = {
  selectedValues: PropTypes.instanceOf(Object).isRequired,
  setNewFilter: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
  resultsByName: PropTypes.instanceOf(Array).isRequired,
  filters: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBox);

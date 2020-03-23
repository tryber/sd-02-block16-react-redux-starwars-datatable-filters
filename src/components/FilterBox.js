import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { removeFilter } from '../store/actions/filterAction';

const FilterBox = ({ filters, removeFilterButton, results }) => {
  const [, ...rest] = filters;
  return (rest[0].numericValues.column)
    ? (
      <div>
        {rest.map(({ numericValues: { column, comparison, value } }) => (
          <div key={column}>
            <button
              type="button"
              value={column}
              onClick={(e) => removeFilterButton(results, filters, e)}
            >
              X
            </button>
            <div>{`${column} | ${comparison} | ${value}`}</div>
          </div>
        ))}
      </div>
    )
    : null;
};

const mapDispatchToProps = (dispatch) => ({
  removeFilterButton: (results, filters, { target }) => (
    dispatch(removeFilter(results, filters, target))),
});

const mapStateToProps = ({
  data: {
    results,
  },
  filterReducer: {
    filters,
  },
}) => ({
  results,
  filters,
});

FilterBox.propTypes = {
  results: propTypes.instanceOf(Array),
  filters: propTypes.instanceOf(Array),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FilterBox);

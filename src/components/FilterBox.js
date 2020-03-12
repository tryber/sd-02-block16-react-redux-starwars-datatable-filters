import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterButton } from '../store/actions/table';

const FilterBox = ({
  setNewFilter, selectedValues, results, resultsByName,
}) => {
  const { column, comparison, value } = selectedValues;
  if (column && comparison && value) {
    return (
      <div>
        <button type="button" onClick={() => setNewFilter(selectedValues, results, resultsByName)}>Clique para filtrar</button>
      </div>
    );
  }
  return null;
};

const mapDispatchToProps = (dispatch) => ({
  setNewFilter: (selectedValues, results, resultsByName) => dispatch(
    filterButton(selectedValues, results, resultsByName),
  ),
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
  },
}) => ({
  selectedValues,
  results,
  resultsByName,
});

FilterBox.propTypes = {
  selectedValues: PropTypes.instanceOf(Object).isRequired,
  setNewFilter: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
  resultsByName: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBox);

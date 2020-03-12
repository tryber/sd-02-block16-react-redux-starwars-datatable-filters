import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const filterNameFunction = (table, filterName) => {
  const filteredTable = table.filter(({ name }) => name.includes(filterName));
  return filteredTable;
};

const TextInputFilter = ({ dispatch, data }) => {
  const FILTER_BY_NAME = 'FILTER_BY_NAME';
  const TOGGLE_FILTER = 'TOGGLE_FILTER';

  const togglePlanets = { type: TOGGLE_FILTER };
  const defaultPlanets = data || JSON.parse(localStorage.getItem('planets'));

  const dispatchNameFilter = (event) => {
    const { target: { value: nameFilter } } = event;
    if (nameFilter === '') return dispatch(togglePlanets);
    const filteredResults = filterNameFunction(defaultPlanets, nameFilter);
    const actionFilter = () => ({ type: FILTER_BY_NAME, name: nameFilter, filteredResults });
    return dispatch(actionFilter());
  };

  return (
    <>
      <input type="text" onChange={(e) => dispatchNameFilter(e)} />
    </>
  );
};


const mapStateToProps = ({ filterByNumericValue, planetFetcher }) => {
  const { data: numFilterData, isFilteredByNumber } = filterByNumericValue;
  const { data: defaultData } = planetFetcher;
  if (isFilteredByNumber) return { data: numFilterData };
  return { data: defaultData };
};


export default connect(mapStateToProps)(TextInputFilter);

TextInputFilter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

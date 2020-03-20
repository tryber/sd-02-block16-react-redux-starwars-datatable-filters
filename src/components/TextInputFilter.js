import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TextInputFilter = ({ dispatch }) => {
  const CHANGE_NAME_FILTER = 'CHANGE_NAME_FILTER';
  const dispatchNameFilter = (event) => {
    const { target: { value: nameFilter } } = event;
    const nameFilterProp = { name: nameFilter };
    const filterByName = () => ({ type: CHANGE_NAME_FILTER, nameFilterProp });
    return dispatch(filterByName());
  };

  return (
    <div>
      <input type="text" onChange={(e) => dispatchNameFilter(e)} />
    </div>
  );
};

export default connect()(TextInputFilter);

TextInputFilter.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

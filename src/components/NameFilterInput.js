import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { planetFilterName } from '../actions';

function NameFilterInput({ filterName }) {
  return (
    <input
      type="text"
      placeholder="Filtrar pelo Nome"
      onChange={(e) => filterName(e.target.value)}
    />
  );
}

NameFilterInput.propTypes = {
  filterName: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  filterName: (value) => dispatch(planetFilterName(value)),
});

export default connect(null, mapDispatchToProps)(NameFilterInput);

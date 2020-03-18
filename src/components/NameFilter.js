import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const NameFilter = ({ filtredName }) => (
  <input type="text" onChange={({ target: { value } }) => { filtredName(value); }} />
);

const mapDispatchToProps = (dispatch) => ({
  filtredName: (value) => dispatch({ type: 'NAMEFILTER', name: value }),
});

export default connect(null, mapDispatchToProps)(NameFilter);

NameFilter.propTypes = {
  filtredName: PropTypes.func,
}.isRequired;

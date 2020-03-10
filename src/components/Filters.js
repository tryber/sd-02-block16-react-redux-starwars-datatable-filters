import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Filters = ({ filtredName }) => <input type="text" onChange={({ target: { value } }) => { filtredName(value); }} />;

const mapDispatchToProps = (dispatch) => ({
  filtredName: (value) => dispatch({ type: 'NAMEFILTER', name: value }),
});

export default connect(null, mapDispatchToProps)(Filters);

Filters.propTypes = {
  filtredName: PropTypes.func,
}.isRequired;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function verifySelect(filters, value) {
  const exists = filters.find((filterObj) => filterObj.column === value);
  if (exists) return false;
  return true;
}

function ColumnFilterSelect({ numeric_values, handleChange }) {
  return (
    <select name="column" onChange={(e) => handleChange(e.target.value)}>
      <option value="">Selecionar Opção</option>
      {verifySelect(numeric_values, 'population') && <option value="population">Population</option>}
      {verifySelect(numeric_values, 'orbital_period') && <option value="orbital_period">Orbital Period</option>}
      {verifySelect(numeric_values, 'diameter') && <option value="diameter">Diameter</option>}
      {verifySelect(numeric_values, 'rotation_period') && <option value="rotation_period">Rotation Period</option>}
      {verifySelect(numeric_values, 'surface_water') && <option value="surface_water">Surface Water</option>}
    </select>
  );
}

ColumnFilterSelect.propTypes = {
  handleChange: PropTypes.func.isRequired,
  numeric_values: PropTypes.arrayOf(PropTypes.shape({})),
};

ColumnFilterSelect.defaultProps = {
  numeric_values: [],
};

const mapStateToProps = ({ filters: { numeric_values } }) => ({ numeric_values });

export default connect(mapStateToProps)(ColumnFilterSelect);

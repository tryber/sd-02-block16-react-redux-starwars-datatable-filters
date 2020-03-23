import React from 'react';
import PropTypes from 'prop-types';

function ValueFilterInput({ handleChange }) {
  return (
    <input
      type="number"
      placeholder="Filtrar por Valor"
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}

ValueFilterInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default ValueFilterInput;

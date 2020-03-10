import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FilterBox = ({ column, comparison, value }) => (
  <div>
    {column && comparison && value ? `${column}, ${comparison}, ${value}` : <div>teste</div>}
  </div>
);

const mapStateToProps = ({
  data: {
    filters: [{ numeric_values: { column, comparison, value } }],
  },
}) => ({
  column,
  comparison,
  value,
});

FilterBox.propTypes = {
  column: PropTypes.string.isRequired,
  comparison: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FilterBox);

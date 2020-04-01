import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ReturnFilters.css';

const ReturnFilters = ({ filters }) => (
  <div className="Return_Filters-father">
    {filters.map((filter) => (
      <div
        key={`numeric values ${filter.numericValues.column}`}
        className="Return_Filters-data"
      >
        <p className="Return_Filter-text">
          {filter.numericValues.column}
          <span className="Return_Filter-text">|</span>
        </p>
        <p className="Return_Filter-text">
          {filter.numericValues.comparison}
          <span className="Return_Filter-text">|</span>
        </p>
        <p className="Return_Filter-text">
          {filter.numericValues.value}
        </p>
        <button className="Return_Filter-button" type="button">X</button>
      </div>
    ))}
  </div>
);

ReturnFilters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object),
};

ReturnFilters.defaultProps = {
  filters: [],
};

export default ReturnFilters;

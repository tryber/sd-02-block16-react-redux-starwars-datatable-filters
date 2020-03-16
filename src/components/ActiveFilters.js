import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeFilters } from '../actions';

class ActiveFilters extends Component {
  constructor(props) {
    super(props);
    this.showActiveFilters = this.showActiveFilters.bind(this);
    this.createFilter = this.createFilter.bind(this);
  }

  createFilter(filterObj) {
    const { removePlanetFilters } = this.props;
    return (
      <p key={filterObj.column} className="active-filters">
        {`${filterObj.column} | ${filterObj.comparison} | ${filterObj.value}  `}
        <button type="button" onClick={() => removePlanetFilters(filterObj)}>X</button>
      </p>
    );
  }

  showActiveFilters(filters) {
    return filters.map((filter) => this.createFilter(filter));
  }

  render() {
    const { numeric_values: numericValues } = this.props;
    return (
      <div className="active-filters">
        <h3>Filtros Ativos</h3>
        {numericValues && this.showActiveFilters(numericValues)}
      </div>
    );
  }
}

const mapStateToProps = ({ filters: { numeric_values } }) => ({ numeric_values });

const mapDispatchToProps = (dispatch) => ({
  removePlanetFilters: (value) => dispatch(removeFilters(value)),
});

ActiveFilters.propTypes = {
  numeric_values: PropTypes.arrayOf(PropTypes.shape({})),
  removePlanetFilters: PropTypes.func.isRequired,
};

ActiveFilters.defaultProps = {
  numeric_values: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveFilters);

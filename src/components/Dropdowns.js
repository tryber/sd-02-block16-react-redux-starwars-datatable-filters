import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { filterColumns, filterComparison, filterNumber } from '../actions/dropdownActions';

class Dropdowns extends React.Component {
  static generateColumns(func) {
    const columns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    return (
      <select onChange={(e) => func(e.target.value)}>
        {columns.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    );
  }

  static generateComparison(func) {
    const comparison = ['greater than', 'equal to', 'less than'];
    return (
      <select onChange={(e) => func(e.target.value)}>
        {comparison.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    );
  }

  render() {
    const {
      filterBycolumn,
      filterByComparison,
      filterByNumber,
    } = this.props;
    return (
      <div>
        {Dropdowns.generateColumns(filterBycolumn)}
        {Dropdowns.generateComparison(filterByComparison)}
        <input
          type="number"
          placeholder="type a number here!"
          onChange={(e) => filterByNumber(e.target.value)}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  filterBycolumn: (column) => dispatch(filterColumns(column)),
  filterByComparison: (comparison) => dispatch(filterComparison(comparison)),
  filterByNumber: (value) => dispatch(filterNumber(value)),
});

export default connect(null, mapDispatchToProps)(Dropdowns);

Dropdowns.propTypes = {
  filterBycolumn: propTypes.func.isRequired,
  filterByComparison: propTypes.func.isRequired,
  filterByNumber: propTypes.func.isRequired,
};

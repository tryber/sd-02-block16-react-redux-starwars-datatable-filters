import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { filterColumns, filterComparison, filterNumber } from '../actions/dropdownActions';

class Dropdowns extends React.Component {
  static generateColumns(func, arr) {
    return (
      <select onChange={(e) => func(e.target.value)}>
        <option value="">Select Column</option>
        {arr.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    );
  }

  static generateComparison(func) {
    const comparison = ['more than', 'equal to', 'less than'];
    return (
      <select onChange={(e) => func(e.target.value)}>
        <option value="">Select Comparison</option>
        {comparison.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    );
  }

  render() {
    const {
      filterBycolumn,
      filterByComparison,
      filterByNumber,
      columns,
    } = this.props;
    return (
      <div>
        {Dropdowns.generateColumns(filterBycolumn, columns)}
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

const mapStateToProps = ({
  dropdownReducer: {
    columns,
  },
}) => ({
  columns,
});

const mapDispatchToProps = (dispatch) => ({
  filterBycolumn: (column) => dispatch(filterColumns(column)),
  filterByComparison: (comparison) => dispatch(filterComparison(comparison)),
  filterByNumber: (value) => dispatch(filterNumber(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdowns);

Dropdowns.propTypes = {
  filterBycolumn: propTypes.func.isRequired,
  filterByComparison: propTypes.func.isRequired,
  filterByNumber: propTypes.func.isRequired,
  columns: propTypes.arrayOf(propTypes.string).isRequired,
};

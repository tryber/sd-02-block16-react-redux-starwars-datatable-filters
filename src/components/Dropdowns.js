import React from 'react';
import { connect } from 'react-redux';
import { filterColumns, filterComparison, filterNumber } from '../actions/dropdownActions';

class Dropdowns extends React.Component {
  generateColumns() {
    console.log(this);
    const { filterBycolumn } = this.props;
    const columns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    return (
      <select onChange={(e) => filterBycolumn(e.target.value)}>
        {columns.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    );
  }

  generateComparison() {
    const { filterByComparison } = this.props;
    console.log(this);
    const comparison = ['greater than', 'equal to', 'less than'];
    return (
      <select onChange={(e) => filterByComparison(e.target.value)}>
        {comparison.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    );
  }

  render() {
    const { filterByNumber } = this.props;
    return (
      <div>
        {this.generateColumns()}
        {this.generateComparison()}
        <input type="number" placeholder="type a number here!" onChange={(e) => filterByNumber(e.target.value)} />
      </div>
    );
  }
}

const mapStateToProps = ({
  dropdownReducer: {
    filters,
  },
}) => ({
  filters,
});

const mapDispatchToProps = (dispatch) => ({
  filterBycolumn: (column) => dispatch(filterColumns(column)),
  filterByComparison: (comparison) => dispatch(filterComparison(comparison)),
  filterByNumber: (value) => dispatch(filterNumber(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdowns);

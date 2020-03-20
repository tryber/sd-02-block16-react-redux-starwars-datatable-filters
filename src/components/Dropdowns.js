import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
// eraseColumns,
import {
  comparisonParamEqual, numberWritten, filterColumns,
} from '../actions/columnsActions';

class Dropdowns extends React.Component {
  render() {
    const { DropdownFilterColumns, DropdownComparisonEql, DropdownNumberWritten } = this.props;
    const columns = ['surface_water', 'population', 'rotation_period', 'orbital_period', 'diameter'];
    const comparison = ['more than', 'less than', 'equal'];
    return (
      <div className="Dropdowns">
        <select onChange={(e) => DropdownFilterColumns(e.target.value)}>
          <option value="" disabled selected hidden>Select Column</option>
          {columns
            .map((column) => (
              <option
                key={column}
                value={column}
              >
                {column}
              </option>
            ))}
        </select>
        {/* <button type="button" onClick={eraseColumns()}>X</button> */}
        <br />
        <select onChange={(e) => DropdownComparisonEql(e.target.value)}>
          <option value="" disabled selected hidden>Select your comparison</option>
          {comparison.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        {/* <button type="button" onClick={eraseColumns()}>X</button> */}
        <br />
        <input type="number" placeholder="type a number here!" onChange={(e) => DropdownNumberWritten(e.target.value)} />
        {/* <button type="button" onClick={eraseColumns()}>X</button> */}
        <br />
      </div>
    );
  }
}

const mapStateToProps = ({
  columnsReducer: {
    filters,
  },
}) => ({ filters });

const mapDispatchToProps = (dispatch) => ({
  DropdownFilterColumns: (column) => dispatch(filterColumns(column)),
  DropdownComparisonEql: (equal) => dispatch(comparisonParamEqual(equal)),
  DropdownNumberWritten: (number) => dispatch(numberWritten(number)),
  // clearFilters: () => dispatch(eraseColumns()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdowns);

Dropdowns.propTypes = {
  DropdownFilterColumns: propTypes.string.isRequired,
  DropdownComparisonEql: propTypes.string.isRequired,
  DropdownNumberWritten: propTypes.string.isRequired,
};

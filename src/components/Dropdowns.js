import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  comparisonParamEqual, numberWritten, filterColumns,
} from '../actions/columnsActions';

class Dropdowns extends React.Component {
  render() {
    const { DropdownFilterColumns, DropdownComparisonEql, DropdownNumberWritten } = this.props;
    const columns = ['surface_water', 'population', 'rotation_period', 'orbital_period', 'diameter'];
    const comparison = ['Maior que', 'Menor que', 'Igual a'];
    return (
      <div className="Dropdowns">
        <select onChange={(e) => DropdownFilterColumns(e.target.value)}>
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
        <select onChange={(e) => DropdownComparisonEql(e.target.value)}>
          {comparison.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <input type="number" onChange={(e) => DropdownNumberWritten(e.target.value)}/>
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
  // DropdownComparisonGrt: (greater) => dispatch(comparisonParamGreater(greater)),
  // DropdownComparisonLow: (lower) => dispatch(comparisonParamLower(lower)),
  DropdownComparisonEql: (equal) => dispatch(comparisonParamEqual(equal)),
  DropdownNumberWritten: (number) => dispatch(numberWritten(number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdowns);

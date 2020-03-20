import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  comparisonParamEqual, numberWritten, filterColumns, deleteColumns,
} from '../actions/columnsActions';

class Dropdowns extends React.Component {
  deleteField(e) {
    const { DropdownFilterColumns, DropdownComparisonEql, DropdownNumberWritten } = this.props;
    DropdownFilterColumns(e.target.value);
    DropdownComparisonEql(e.target.value);
    DropdownNumberWritten(e.target.value);
  }

  render() {
    const { DropdownFilterColumns, DropdownComparisonEql, DropdownNumberWritten, DropdownDeleteColumn, hide } = this.props;
    const { filters } = this.props;
    const columns = ['surface_water', 'population', 'rotation_period', 'orbital_period', 'diameter'];
    const comparisonArr = ['more than', 'less than', 'equal'];
    return (
      <div className="Dropdowns">
        <select onChange={(e) => DropdownFilterColumns(e.target.value)} hidden={hide}>
          <option value="" disabled selected hidden>Select Column</option>
          {columns
            .map((column) => (<option key={column} value={column}>{column}</option>
            ))}
        </select>
        <select onChange={(e) => DropdownComparisonEql(e.target.value)} hidden={hide}>
          <option value="true" disabled selected hidden>Select your comparison</option>
          {comparisonArr.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <input
          value={filters[0].numericValues.value}
          type="number"
          placeholder="type a number here!"
          onChange={(e) => DropdownNumberWritten(e.target.value)}
          hidden={hide}
        />
        <button type="button" value="true" onClick={(e) => DropdownDeleteColumn(e.target.value)}>X</button>
      </div>
    );
  }
}

const mapStateToProps = ({
  columnsReducer: {
    filters, hide,
  },
}) => ({ filters, hide });

const mapDispatchToProps = (dispatch) => ({
  DropdownFilterColumns: (column) => dispatch(filterColumns(column)),
  DropdownComparisonEql: (equal) => dispatch(comparisonParamEqual(equal)),
  DropdownNumberWritten: (number) => dispatch(numberWritten(number)),
  DropdownDeleteColumn: (hide) => dispatch(deleteColumns(hide)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdowns);

Dropdowns.propTypes = {
  DropdownFilterColumns: propTypes.string.isRequired,
  DropdownComparisonEql: propTypes.string.isRequired,
  DropdownNumberWritten: propTypes.string.isRequired,
};

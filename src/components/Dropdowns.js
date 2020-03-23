import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  comparisonParamEqual, numberWritten, filterColumns, deleteColumns,
} from '../actions/columnsActions';

class Dropdowns extends React.Component {
  inputAndDeleteBUttons() {
    const {
      DropdownNumberWritten, DropdownDeleteColumn, filters, hide,
    } = this.props;
    return (
      <div>
        <input
          value={filters[0].numericValues.value}
          type="number"
          placeholder="type a number here!"
          onChange={({ target }) => DropdownNumberWritten(target.value)}
          hidden={hide}
        />
        <button
          type="button"
          value="true"
          onClick={({ target }) => DropdownDeleteColumn(target.value)}
          hidden={hide}
        >
          X
        </button>
      </div>
    );
  }

  render() {
    const {
      DropdownFilterColumns,
      DropdownComparisonEql,
      hide,
    } = this.props;
    const columns = ['surface_water', 'population', 'rotation_period', 'orbital_period', 'diameter'];
    const comparisonArr = ['more than', 'less than', 'equal'];
    return (
      <div className="Dropdowns">
        <select onChange={({ target }) => DropdownFilterColumns(target.value)} hidden={hide}>
          <option value="" disabled selected hidden>Select Column</option>
          {columns
            .map((column) => (<option key={column} value={column}>{column}</option>
            ))}
        </select>
        <select onChange={({ target }) => DropdownComparisonEql(target.value)} hidden={hide}>
          <option value="true" disabled selected hidden>Select your comparison</option>
          {comparisonArr.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        {this.inputAndDeleteBUttons()}
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
  DropdownDeleteColumn: propTypes.func.isRequired,
  filters: propTypes.instanceOf(Array).isRequired,
  hide: propTypes.bool.isRequired,
};

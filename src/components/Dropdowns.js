import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  comparisonParamEqual, numberWritten, filterColumns, deleteColumns,
} from '../actions/columnsActions';

class Dropdowns extends React.Component {
  inputAndDeleteBUttons() {
    const {
      DropdownNumberWritten, DropdownDeleteColumn, filters,
    } = this.props;
    return (
      <div>
        <input
          value={filters[0].numericValues.value}
          type="number"
          placeholder="type a number here!"
          onChange={({ target }) => DropdownNumberWritten(target.value)}
        />
        <button
          type="button"
          value=""
          onClick={({ target }) => DropdownDeleteColumn(target.value)}
        >
          X
        </button>
      </div>
    );
  }

  render() {
    const { DropdownFilterColumns, DropdownComparisonEql } = this.props;
    const columns = ['surface_water', 'population', 'rotation_period', 'orbital_period', 'diameter'];
    const comparisonArr = ['more than', 'less than', 'equal'];
    return (
      <div className="Dropdowns">
        <select
          onChange={({ target }) => DropdownFilterColumns(target.value)}
          defaultValue="DEFAULT"
        >
          <option value="DEFAULT">Select Column</option>
          {columns
            .map((column) => (<option key={column} value={column}>{column}</option>))}
        </select>
        <select
          onChange={({ target }) => DropdownComparisonEql(target.value)}
          defaultValue="DEFAULT"
        >
          <option value="DEFAULT" hidden>Select your comparison</option>
          {comparisonArr.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        {this.inputAndDeleteBUttons()}
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
  DropdownDeleteColumn: () => dispatch(deleteColumns()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdowns);

Dropdowns.propTypes = {
  DropdownFilterColumns: propTypes.func.isRequired,
  DropdownComparisonEql: propTypes.func.isRequired,
  DropdownNumberWritten: propTypes.func.isRequired,
  DropdownDeleteColumn: propTypes.func.isRequired,
  filters: propTypes.instanceOf(Array).isRequired,
};

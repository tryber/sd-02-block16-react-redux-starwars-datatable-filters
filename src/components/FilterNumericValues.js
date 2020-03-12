import React, { Component } from 'react';
import { connect } from 'react-redux';

const changeFilterByNumericValues = (event) => {
  const { value, name } = event.target;
  return {
    type: 'CHANGE_FILTER_BY_NUMERIC_VALUES',
    value: value,
    name: name,
  };
}

class FilterNumericValues extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { valueSelectedColumn, valueSelectedComparison, valueNumber, handleChange } = this.props;
    return (
      <div>
        <select value={valueSelectedColumn} name="column" onChange={handleChange}>
          <option value="population">Population</option>
          <option value="orbital_period">Orbital Period</option>
          <option value="diameter">Diameter</option>
          <option value="rotation_period">Rotation Period</option>
          <option value="surface_water">Surface Water</option>
        </select>
        <select value={valueSelectedComparison} name="comparison" onChange={handleChange}>
          <option value=">">greater than</option>
          <option value="<">less than</option>
          <option value="===">equal to</option>
        </select>
        <input type="number" value={valueNumber} name="value" onChange={handleChange} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  valueSelectedColumn: state.filters[1].numericValues.column,
  valueSelectedComparison: state.filters[1].numericValues.comparison,
  valueNumber: state.filters[1].numericValues.value,
});

const mapDispatchToProps = (dispatch) => ({
  handleChange: function (event) {
    dispatch(changeFilterByNumericValues(event));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterNumericValues);

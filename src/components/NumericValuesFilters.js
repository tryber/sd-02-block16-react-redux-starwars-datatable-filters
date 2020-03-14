import React, { Component } from 'react';
import { connect } from 'react-redux';
import changeNumericValuesFilters from '../actions/changeNumericValuesFilters';
import deleteNumericValuesFilters from '../actions/deleteNumericValuesFilters';
import PropTypes from 'prop-types';

class NumericValuesFilters extends Component {
  constructor(props) {
    super(props);
  }

  addFilter(i) {
    const { arrayColumns, handleChange, handleClick } = this.props;
    const newArrayColumns = arrayColumns.slice(0, i - 1);
    const allColumns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']
    const columnsRestantes = allColumns.reduce((acc, item) => {
      if (newArrayColumns.includes(item)) {
        return acc;
      }
      return [...acc, item]
    }, []);

    return (
      <div id={i}>
        <select name="column" onChange={handleChange} value={this.props[`valueSelectedColumn${i}`]}>
          <option value='' disabled>Selecione o estado</option>
          {columnsRestantes.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
        <select name="comparison" onChange={handleChange} value={this.props[`valueSelectedComparison${i}`]}>
          <option value=">">greater than</option>
          <option value="<">less than</option>
          <option value="===">equal to</option>
        </select>
        <input type="number" name="value" onChange={handleChange} value={this.props[`valueNumber${i}`]} />
        <button type="button" onClick={handleClick}>X</button>
      </div>
    );
  }

  addMoreAndMoreFilters() {
    const arrayValues = this.props.arrayValues;
    const arrayColumns = this.props.arrayColumns;

    let filters = <div></div>;

    if (arrayValues.every((value, index, array) => value !== '' || index === array.length - 1)
      && arrayColumns.every((column, index, array) => column !== '' || index === array.length - 1)) {
      filters = <div>
        {arrayValues.map((item, i) => this.addFilter(i + 1))}
      </div>;
    } else {
      const newArrayValues = arrayValues.slice(0, arrayValues.length - 1); 
      filters = <div>
        {newArrayValues.map((item, i) => this.addFilter(i + 1))}
      </div>;
    }

    return filters;
  }

  render() {
    return (
      <div>
        {this.addMoreAndMoreFilters()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const objectStates = state.filters.slice(1).reduce((acc, current, i) => ({
    ...acc,
    [`valueSelectedColumn${i + 1}`]: current.numericValues.column,
    [`valueSelectedComparison${i + 1}`]: current.numericValues.comparison,
    [`valueNumber${i + 1}`]: current.numericValues.value,
  }), {});
  const arrayValues = state.filters.slice(1).map(item => item.numericValues.value );
  const arrayColumns = state.filters.slice(1).map(item => item.numericValues.column);

  return { ...objectStates, arrayValues, arrayColumns };
};

const mapDispatchToProps = (dispatch) => ({
  handleChange: (event) => {
    dispatch(changeNumericValuesFilters(event));
  },
  handleClick: (event) => {
    dispatch(deleteNumericValuesFilters(event));
  },
});

NumericValuesFilters.propTypes = {
  arrayValues: PropTypes.array.isRequired,
  arrayColumns: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(NumericValuesFilters);

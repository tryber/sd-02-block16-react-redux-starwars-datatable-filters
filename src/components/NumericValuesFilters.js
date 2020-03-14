import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHANGE_FILTER_BY_NUMERIC_VALUES, DELETE_FILTER_BY_NUMERIC_VALUES } from '../reducers/filtersReducer'

const changeFilterByNumericValues = (event) => {
  const { value, name } = event.target;
  const { id } = event.target.parentNode;
  return {
    type: CHANGE_FILTER_BY_NUMERIC_VALUES,
    value: value,
    name: name,
    id: Number(id),
  };
}

const cancelFilterByNumericValues = (event) => {
  const { id } = event.target.parentNode;
  return {
    type: DELETE_FILTER_BY_NUMERIC_VALUES,
    id: Number(id),
  };
}

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
    console.log('arrayrestante', columnsRestantes)
    console.log('newarraycolumns', newArrayColumns)
    return (
      <div id={i}>
        <select name="column" onChange={handleChange} value={this.props[`valueSelectedColumn${i}`]}>
          <option value='' disabled>Selecione o estado</option>
          {columnsRestantes.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
          {/* <option value="population">Population</option>
          <option value="orbital_period">Orbital Period</option>
          <option value="diameter">Diameter</option>
          <option value="rotation_period">Rotation Period</option>
          <option value="surface_water">Surface Water</option> */}
        </select>
        <select name="comparison" onChange={handleChange} value={this.props[`valueSelectedComparison${i}`]}>
          <option value=">">greater than</option>
          <option value="<">less than</option>
          <option value="===">equal to</option>
        </select>
        <input type="number" name="value" onChange={handleChange} value={this.props[`valueNumber${i}`]} />
        <button type="button" name="cancel" onClick={handleClick}>X</button>
      </div>
    );
  }

  addMoreAndMoreFilters() {
    const arrayValues = this.props.arrayValues;
    const arrayColumns = this.props.arrayColumns;
    console.log('olha o array values', arrayValues)

    let filters = <div></div>;
    // filters = <div>
    //   {arrayValues.map((item, i) => {

    //   })}
    // </div>

    if (arrayValues.every((value, index, array) => value !== '' || index === array.length - 1)
      && arrayColumns.every((column, index, array) => column !== '' || index === array.length - 1)) {
      filters = <div>
        {arrayValues.map((item, i) => this.addFilter(i + 1))}
      </div>;
      console.log('entrou nesse if values', arrayValues)
    }
     else {
      arrayValues.pop(); 
      filters = <div>
        {arrayValues.map((item, i) => this.addFilter(i + 1))}
      </div>;
    }

    return filters;
    // if (Number(valueLastNumber) >= 0) {
    //   this.addFilter()
    // }
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
//   valueLastNumber: state.filters[state.filters.length - 1].numericValues.value,
};

const mapDispatchToProps = (dispatch) => ({
  handleChange: function (event) {
    dispatch(changeFilterByNumericValues(event));
  },
  handleClick: function (event) {
    dispatch(cancelFilterByNumericValues(event));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NumericValuesFilters);

{/* <option value="population">Population</option>
          <option value="orbital_period">Orbital Period</option>
          <option value="diameter">Diameter</option>
          <option value="rotation_period">Rotation Period</option>
          <option value="surface_water">Surface Water</option> */}
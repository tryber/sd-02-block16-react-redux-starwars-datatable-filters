import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterByName, filterByColumn } from '../store/actions/filterAction';
import FilterBox from './FilterBox';

class TableFIlters extends React.Component {
  constructor(props) {
    super(props);
    const dropdownColumn = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const dropdownComparison = ['maior que', 'menor que', 'igual a'];

    this.state = {
      dropdownColumn,
      dropdownComparison,
      column: '',
      comparison: '',
      value: 0,
    };
    this.onHandleChangeSelecting = this.onHandleChangeSelecting.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  onHandleChangeSelecting(filterValues, name) {
    this.setState({
      [name]: filterValues,
    });
  }

  clearState() {
    const { column, comparison, value } = this.state;
    const { getNumericValues, filterResults, filters } = this.props;
    getNumericValues(filterResults, filters[0].name, column, comparison, value);


    this.setState({
      column: '',
      comparison: '',
      value: 0,
    });
  }

  inputNameFilter() {
    const { name } = this.state;
    const {
      filterByTyping, results, filters,
    } = this.props;

    return (
      <input
        type="text"
        placeholder="Digite um nome"
        value={name}
        onChange={(e) => filterByTyping(results, e.target.value, filters)}
      />
    );
  }

  selectColumn() {
    const { dropdownColumn, column } = this.state;
    const { filters } = this.props;
    const [, ...rest] = filters;
    const newDropDownColumn = dropdownColumn.filter((dropdown) => (
      !rest.map(({ numericValues }) => numericValues.column).includes(dropdown)
    ));

    return (
      <select
        value={column}
        name="column"
        onChange={({ target: { value, name } }) => this.onHandleChangeSelecting(value, name)}
      >
        <option value="" disabled>Escolha uma coluna</option>
        {
          newDropDownColumn.map((dropdown) => (
            <option key={dropdown} value={dropdown}>{dropdown}</option>
          ))
        }
      </select >
    );
  }

  selectComparison() {
    const { dropdownComparison, comparison } = this.state;

    return (
      <select
        value={comparison}
        name="comparison"
        onChange={({ target: { value, name } }) => this.onHandleChangeSelecting(value, name)}
      >
        <option value="" disabled>Escolha um comparador</option>
        {dropdownComparison.map((dropdown) => (
          <option
            key={dropdown}
            value={dropdown}
          >
            {dropdown}
          </option>
        ))}
      </select>
    );
  }

  inputNumber() {
    const { value: inputValue } = this.state;
    return (
      <input
        type="number"
        name="value"
        value={inputValue}
        placeholder="Digite um numero"
        onChange={({ target: { value, name } }) => this.onHandleChangeSelecting(value, name)}
      />
    );
  }

  filterButton() {
    return (
      <button type="button" onClick={this.clearState}>Clique para Filtrar</button>
    );
  }

  render() {
    const { column, comparison, value } = this.state;
    if (column && comparison && value) {
      return (
        <div>
          {this.inputNameFilter()}
          {this.selectColumn()}
          {this.selectComparison()}
          {this.inputNumber()}
          {this.filterButton()}
          <FilterBox />
        </div>
      );
    }
    return (
      <div>
        {this.inputNameFilter()}
        {this.selectColumn()}
        {this.selectComparison()}
        {this.inputNumber()}
        <FilterBox />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getNumericValues: (filterResults, name, column, comparison, value) => (
    dispatch(filterByColumn(filterResults, name, column, comparison, value))
  ),
  filterByTyping: (results, name, filters) => (
    dispatch(filterByName(results, name, filters))
  ),
});

const mapStateToProps = ({
  data: {
    results,
  },
  filterReducer: {
    filterResults,
    filters,
  },
}) => ({
  results,
  filterResults,
  filters,
});

export default connect(mapStateToProps, mapDispatchToProps)(TableFIlters);

TableFIlters.propTypes = {
  filters: propTypes.instanceOf(Array),
  filterByTyping: propTypes.func,
  results: propTypes.instanceOf(Array),
  filterResults: propTypes.instanceOf(Array),
  getNumericValues: propTypes.func,
}.isRequired;

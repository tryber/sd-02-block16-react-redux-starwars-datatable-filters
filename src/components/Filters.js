import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  nameToFilter,
  columnToFilter,
  comparisonToFilter,
  valueToFilter,
  changeToFilter,
} from '../actions';
import './Filters.css';

class Filters extends Component {
  selectColumn() {
    const { column, passingColumn } = this.props;
    return (
      <div>
        <select
          onChange={(e) => passingColumn(e.target.value, 'column')}
          value={column}
        >
          <option value="" hidden>Escolha uma coluna</option>
          <option value="population">Population</option>
          <option value="orbital_period">Orbital period</option>
          <option value="diameter">Diameter</option>
          <option value="rotation_period">Rotation period</option>
          <option value="surface_water">Surface water</option>
        </select>
      </div>
    );
  }

  selectComparison() {
    const { comparison, passingComparison } = this.props;
    return (
      <div>
        <select
          onChange={(e) => passingComparison(e.target.value, 'comparison')}
          value={comparison}
        >
          <option value="" hidden>Escolha uma comparador</option>
          <option value=">">Maior que</option>
          <option value="<">Menor que</option>
          <option value="=">Igual a</option>
        </select>
      </div>
    );
  }

  inputValue() {
    const { value, passingValue } = this.props;
    return (
      <div>
        <input
          type="text"
          placeholder="Digite aqui"
          onChange={(e) => passingValue(e.target.value, 'value')}
          value={value}
        />
      </div>
    );
  }

  createFilter() {
    const { column, comparison, value, filteredData, fireFilters } = this.props;
    let filterData = [];
    switch (comparison) {
      case '>':
        filterData = filteredData.filter((item) => item[column] > parseInt(value, 10));
        break;
      case '<':
        filterData = filteredData.filter((item) => item[column] < parseInt(value, 10));
        break;
      case '=':
        filterData = filteredData.filter((item) => item[column] === value);
        break;
      default:
        filterData = null;
    }

    console.log('first map', filterData);
    fireFilters(filterData);
  }

  buttonFilter() {
    const { column, comparison, value } = this.props;
    let off = true;
    if (column !== '' && comparison !== '' && value !== '') off = false;
    return (
      <button
        type="button"
        disabled={off}
        onClick={() => this.createFilter()}
      >
        Fazer busca
      </button>
    );
  }

  render() {
    const { name, passingName } = this.props;
    return (
      <div>
        <div className="flexyNumberFilters">
          {this.selectColumn()}
          {this.selectComparison()}
          {this.inputValue()}
          {this.buttonFilter()}
        </div>
        <p>Digite o nome do planeta:</p>
        <input
          type="text"
          placeholder="Digite aqui"
          onChange={(e) => passingName(e.target.value)}
          value={name}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  reducerPlanets: { filteredData },
  allFilters: {
    filters: [
      {
        name,
      },
      {
        numericValues: {
          column,
          comparison,
          value,
        },
      }],
  },
}) => ({
  name, column, comparison, value, filteredData,
});

const mapDispatchToProps = (dispatch) => ({
  passingName: (param) => dispatch(nameToFilter(param)),
  passingColumn: (param, selector) => dispatch(columnToFilter(param, selector)),
  passingComparison: (param, selector) => dispatch(comparisonToFilter(param, selector)),
  passingValue: (param, selector) => dispatch(valueToFilter(param, selector)),
  fireFilters: (array) => dispatch(changeToFilter(array)),
});

Filters.propTypes = {
  passingName: PropTypes.func.isRequired,
  passingColumn: PropTypes.func.isRequired,
  passingComparison: PropTypes.func.isRequired,
  passingValue: PropTypes.func.isRequired,
  fireFilters: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
  comparison: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  filteredData: PropTypes.instanceOf(Array),
};

Filters.defaultProps = {
  filteredData: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

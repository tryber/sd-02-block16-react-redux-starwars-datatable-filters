import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchByNumber } from '../actions';


class Selectors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      column: '',
      comparison: '',
      value: null,
    };

    this.onChangeColumn = this.onChangeColumn.bind(this);
    this.onChangeComparison = this.onChangeComparison.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onChangeColumn(event) {
    const { value } = event.target;
    this.setState({ column: value });
  }

  onChangeComparison(event) {
    const { value } = event.target;
    this.setState({ comparison: value });
  }

  onChangeValue(event) {
    const { value } = event.target;
    this.setState({ value });
  }

  onClickHandler() {
    const { searchPlanetsByNumber, activeFilter } = this.props;
    let { results, filteredByName, filteredByNumber } = this.props;
    const { column, comparison, value } = this.state;
    if (!column || !comparison || !value) alert('Preencha todos os campos');
    if (filteredByName.length && activeFilter === 'name') {
      filteredByName = searchPlanetsByNumber(column, comparison, value, filteredByName).results;
      this.setState({ column: '', comparison: '', value: null });
      return true;
    } if (filteredByNumber.length) {
      filteredByNumber = searchPlanetsByNumber(column, comparison, value, filteredByNumber).results;
      this.setState({ column: '', comparison: '', value: null });
      return true;
    }
    searchPlanetsByNumber(column, comparison, value, results);
    results = searchPlanetsByNumber(column, comparison, value, results).results;
    this.setState({ column: '', comparison: '', value: null });
    return true;
  }

  render() {
    const columns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const { filters } = this.props;
    const selectedColumn = filters.map((el) => (
      el.numericValues
        ? el.numericValues.column
        : false
    ));
    return (
      <form>
        <select onChange={this.onChangeColumn}>
          <option value="" label=" " />
          {columns.map((element) => (
            selectedColumn.includes(element)
              ? false
              : <option value={element}>{element}</option>
          ))}
        </select>
        <select onChange={this.onChangeComparison}>
          <option value="" label=" " />
          <option value="Maior que">Maior que</option>
          <option value="Menor que">Menor que</option>
          <option value="Igual a">Igual a</option>
        </select>
        <input type="number" onChange={this.onChangeValue} />
        <input type="reset" value="Filtrar" onClick={this.onClickHandler} />
      </form>
    );
  }
}

Selectors.propTypes = {
  searchPlanetsByNumber: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array),
  filteredByName: PropTypes.instanceOf(Array),
  filteredByNumber: PropTypes.instanceOf(Array),
  filters: PropTypes.instanceOf(Array),
  activeFilter: PropTypes.string,
};

Selectors.defaultProps = {
  results: [],
  filteredByName: [],
  filteredByNumber: [],
  filters: [],
  activeFilter: '',
};

const mapStateToProps = ({
  data: { results },
  SearchFilters: { filteredByName, filteredByNumber, filters, activeFilter },
}) => ({
  results,
  filteredByName,
  filters,
  filteredByNumber,
  activeFilter,
});

const mapDispatchToProps = (dispatch) => ({
  searchPlanetsByNumber: (column,
    comparison,
    value,
    results) => dispatch(searchByNumber(column, comparison, value, results)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Selectors);

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
    const { searchPlanetsByNumber } = this.props;
    let { results, filteredByName } = this.props;
    const { column, comparison, value } = this.state;
    if (!column || !comparison || !value) alert('Preencha todos os campos');
    if (filteredByName.length) {
      searchPlanetsByNumber(column, comparison, value, filteredByName);
      filteredByName = searchPlanetsByNumber(column, comparison, value, filteredByName).results;
    } else {
      searchPlanetsByNumber(column, comparison, value, results);
      results = searchPlanetsByNumber(column, comparison, value, results).results;
    }
  }

  render() {
    return (
      <section>
        <select onChange={this.onChangeColumn}>
          <option value="" label=" " />
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select onChange={this.onChangeComparison}>
          <option value="" label=" " />
          <option value="Maior que">Maior que</option>
          <option value="Menor que">Menor que</option>
          <option value="Igual a">Igual a</option>
        </select>
        <input type="number" onChange={this.onChangeValue} />
        <button type="button" onClick={this.onClickHandler}>Filtrar</button>
      </section>
    );
  }
}

Selectors.propTypes = {
  searchPlanetsByNumber: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array),
  filteredByName: PropTypes.instanceOf(Array),
};

Selectors.defaultProps = {
  results: [],
  filteredByName: [],
};

const mapStateToProps = ({
  data: { results },
  SearchFilters: { filteredByName },
}) => ({
  results,
  filteredByName,
});

const mapDispatchToProps = (dispatch) => ({
  searchPlanetsByNumber: (column,
    comparison,
    value,
    results) => dispatch(searchByNumber(column, comparison, value, results)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Selectors);

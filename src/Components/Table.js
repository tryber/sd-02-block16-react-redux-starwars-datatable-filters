import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  planetsPropTypes,
  planetsDefault,
  filtersPropTypes,
  filtersDefault,
} from './PropTypes';
import evento from '../action';
import './style.css';

function tbodyRender(planet) {
  return (
    <tr key={planet.name}>
      {Object.keys(planet).map((key) => (
        <td key={planet.name + key}>{planet[key]}</td>
      ))}
    </tr>
  );
}

function theadRender(planets) {
  const planet = planets[0];
  delete planet.residents;
  return (
    <tr>
      {Object.keys(planet).map((key) => (
        <td key={`thead-${key}`}>{key}</td>
      ))}
    </tr>
  );
}

function byCondition(planets, filter) {
  const { name, condition, input } = filter.numericValues;
  switch (condition) {
    case 'maior':
      return planets.filter((planet) => parseFloat(planet[name]) > parseFloat(input));
    case 'menor':
      return planets.filter((planet) => parseFloat(planet[name]) < parseFloat(input));
    case 'igual':
      return planets.filter((planet) => parseFloat(planet[name]) === parseFloat(input));
    default:
      return planets;
  }
}

function inputNumber(filter, planets) {
  const { input } = filter.numericValues;
  switch (input) {
    case '':
      return planets;
    case undefined:
      return planets;
    default:
      return byCondition(planets, filter);
  }
}

function sortStringNumber(a, b, name, one, one2) {
  if (Number(a[name]) && Number(b[name])) {
    return ((Number(a[name]) > Number(b[name])) ? one : one2);
  }
  return ((a[name] > b[name]) ? one : one2);
}

class Table extends Component {
  constructor(props) {
    super(props);
    this.tbody = React.createRef();
  }

  componentDidMount() {
    const { requestApi } = this.props;
    requestApi();
  }

  planetName(planets) {
    const { filters } = this.props;
    const { name } = filters[0];
    switch (name) {
      case '':
        return planets;
      default:
        return planets.filter((planet) => planet.name.includes(name));
    }
  }

  inputNumbers(planets) {
    const { filters } = this.props;
    const coisa = [...filters];
    coisa.shift();
    coisa.shift();
    return coisa.reduce((acc, filter) => inputNumber(filter, acc), planets);
  }

  byOrder(planets) {
    const { filters } = this.props;
    const { order: { asc, name } } = filters[1];
    switch (asc) {
      case 'Asc':
        return planets.sort((a, b) => sortStringNumber(a, b, name, 1, -1));
      case 'Desc':
        return planets.sort((a, b) => sortStringNumber(a, b, name, -1, 1));
      default:
        return planets;
    }
  }

  render() {
    const { planets } = this.props;
    return (
      <table>
        <thead>
          {theadRender(planets)}
        </thead>
        <tbody>
          {this.byOrder(this.inputNumbers(this.planetName(planets)))
            .map((planet) => (
              tbodyRender(planet)
            ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  planets: planetsPropTypes.planets,
  filters: filtersPropTypes.filters,
  requestApi: PropTypes.func.isRequired,
};

Table.defaultProps = {
  planets: planetsDefault,
  filters: filtersDefault,
};

const mapStateToProps = (state) => ({
  planets: state.data.planets,
  filters: state.filter.filters,
});


const mapDispatchToProps = (dispatch) => ({
  requestApi: () => dispatch(evento()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

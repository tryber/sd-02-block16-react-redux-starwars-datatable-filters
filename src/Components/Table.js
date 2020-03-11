import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import evento from '../action';
import './style.css';


function tbodyRender(planet, filterByName) {
  switch (filterByName) {
    case 'all':
      return (
        <tr key={planet.name}>
          {Object.keys(planet).map((key) => (
            <td key={planet.name + key}>{planet[key]}</td>
          ))}
        </tr>
      );
    default:
      return (
        <tr key={planet.name}>
          <td>{planet[filterByName]}</td>
        </tr>
      );
  }
}

function theadRender(planets, filterByName) {
  const planet = planets[0];
  delete planet.residents;
  switch (filterByName) {
    case 'all':
      return (
        <tr>
          {Object.keys(planet).map((key) => (
            <td key={`thead-${key}`}>{key}</td>
          ))}
        </tr>
      );
    default:
      return (
        <tr>
          <td>{filterByName}</td>
        </tr>
      );
  }
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

  tbodyByCondition(planets) {
    const { filterByName: name, filterByCondition: condition, input } = this.props;
    if (name !== 'all') {
      switch (condition) {
        case 'maior':
          return planets.filter((planet) => parseFloat(planet[name]) > input);
        case 'menor':
          return planets.filter((planet) => parseFloat(planet[name]) < input);
        case 'igual':
          return planets.filter((planet) => parseFloat(planet[name]) === input);
        default:
          return planets;
      }
    }
    return planets;
  }

  render() {
    const {
      planets, filterByName,
    } = this.props;
    return (
      <table>
        <thead>
          {theadRender(planets, filterByName)}
        </thead>
        <tbody>
          {this.tbodyByCondition(planets).map((planet) => (
            tbodyRender(planet, filterByName)
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  planets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rotation_period: PropTypes.string,
      orbital_period: PropTypes.string,
      diameter: PropTypes.string,
      surface_water: PropTypes.string,
    }),
  ),
  filterByName: PropTypes.string,
  filterByCondition: PropTypes.string,
  input: PropTypes.number,
  requestApi: PropTypes.func.isRequired,
};

Table.defaultProps = {
  planets: [{
    name: '',
    rotation_period: null,
    orbital_period: null,
    diameter: null,
    surface_water: '',
  }],
  filterByName: '',
  filterByCondition: '',
  input: 0,
};

const mapStateToProps = (state) => ({
  planets: state.data.planets,
  filterByName: state.filter.name,
  filterByCondition: state.filter.condition,
  input: state.input.value,
});


const mapDispatchToProps = (dispatch) => ({
  requestApi: () => dispatch(evento()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

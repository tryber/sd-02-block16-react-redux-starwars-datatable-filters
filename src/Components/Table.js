import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    const { inputName } = this.props;
    switch (inputName) {
      case '':
        return planets;
      default:
        return planets.filter((planet) => planet.name.includes(inputName));
    }
  }

  inputNumbers(planets) {
    const { filters } = this.props;
    return filters.reduce((acc, filter) => {
      return this.inputNumber(filter, acc);
    }, planets);
  }

  inputNumber(filter, planets) {
    const { input } = filter.numericValues;
    switch (input) {
      case '':
        return planets;
      default:
        return this.condition(planets, filter);
    }
  }

  condition(planets, filter) {
    const { name, condition, input } = filter.numericValues;
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

  render() {
    const {
      planets,
    } = this.props;
    return (
      <table>
        <thead>
          {theadRender(planets)}
        </thead>
        <tbody>
          {this.inputNumbers(this.planetName(planets)).map((planet) => (
            tbodyRender(planet)
          ))}
        </tbody>
      </table>
    );
  }
}

// Table.propTypes = {
//   planets: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string,
//       rotation_period: PropTypes.string,
//       orbital_period: PropTypes.string,
//       diameter: PropTypes.string,
//       surface_water: PropTypes.string,
//     }),
//   ),
//   filterByName: PropTypes.string,
//   filterByCondition: PropTypes.string,
//   inputNumber: PropTypes.number,
//   inputName: PropTypes.string,
//   requestApi: PropTypes.func.isRequired,
// };

// Table.defaultProps = {
//   planets: [{
//     name: '',
//     rotation_period: null,
//     orbital_period: null,
//     diameter: null,
//     surface_water: '',
//   }],
//   filterByName: '',
//   filterByCondition: '',
//   inputNumber: 0,
//   inputName: '',
// };

const mapStateToProps = (state) => ({
  planets: state.data.planets,
  filters: state.filter.filters,
  inputName: state.input.name,
});


const mapDispatchToProps = (dispatch) => ({
  requestApi: () => dispatch(evento()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

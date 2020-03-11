import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import evento from '../action';
import './style.css';


function tbodyRender(planet, filter) {
  switch (filter) {
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
          <td>{planet[filter]}</td>
        </tr>
      );
  }
}

function theadRender(planets, filter) {
  const planet = planets[0];
  delete planet.residents;
  switch (filter) {
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
          <td>{filter}</td>
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

  render() {
    const { planets, filter } = this.props;
    return (
      <table>
        <thead>
          {theadRender(planets, filter)}
        </thead>
        <tbody>
          {planets.map((planet) => (
            tbodyRender(planet, filter)
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
  filter: PropTypes.string,
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
  filter: '',
};

const mapStateToProps = (state) => ({
  planets: state.data.planets,
  filter: state.filter.value,
});


const mapDispatchToProps = (dispatch) => ({
  requestApi: () => dispatch(evento()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

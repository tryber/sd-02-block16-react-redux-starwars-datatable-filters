import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import PlanetsList from './PlanetsList';
import THead from './THead';

const filtrarPlanetasPorNome = (arrayPlanetas, texto) => (
  arrayPlanetas.filter((planeta) => planeta.name.toUpperCase().includes(texto.toUpperCase()))
);

class Table extends React.Component {
  render() {
    const { arrayPlanetas, texto } = this.props;
    const arrayFiltrado = filtrarPlanetasPorNome(arrayPlanetas, texto);
    return (
      <div>
        <PlanetsList />
        <table>
          <THead />
          <tbody>
            {arrayFiltrado.map((planet) => (
              <tr key={planet.name}>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  arrayPlanetas: state.data.arrPlanetas,
  texto: state.filters[0].name,
});

Table.propTypes = {
  arrayPlanetas: propTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Table);

import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import PlanetsList from './PlanetsList';
import THead from './THead';

const filtrarPlanetasPorNome = (arrayPlanetas, texto) => (
  arrayPlanetas.filter((planeta) => planeta.name.toUpperCase().includes(texto.toUpperCase()))
);

function filtrarPorComparacao(arrPlanetsComFilDeNome, objFiltrosFiltrando) {
  const { column, comparison, value } = objFiltrosFiltrando || {};
  return arrPlanetsComFilDeNome.filter((objComCadaPlaneta) => {
    if (objComCadaPlaneta[column] === 'unknown') return false;

    switch (comparison) {
      case 'Maior que': return Number(objComCadaPlaneta[column]) > Number(value);
      case 'Menor que': return Number(objComCadaPlaneta[column]) < Number(value);
      case 'Igual a': return Number(objComCadaPlaneta[column]) === Number(value);
      default: return true;
    }
  });
}

function filtrarTodasAsComparacoes(arrPlanetsComFilDeNome, arrayNumericFilters) {
  let arrayPlanetasFiltrado = arrPlanetsComFilDeNome;

  arrayNumericFilters.forEach((objectNumericValues) => {
    arrayPlanetasFiltrado = filtrarPorComparacao(arrayPlanetasFiltrado, objectNumericValues);
  });

  // console.log('uhuhu', arrayPlanetasFiltrado)
  return arrayPlanetasFiltrado;
}

class Table extends React.Component {
  render() {
    const { arrayPlanetas, texto, arrayNumericFilters } = this.props;
    const arrPlanetsComFilDeNome = filtrarPlanetasPorNome(arrayPlanetas, texto);
    const arrTodoFiltrado = filtrarTodasAsComparacoes(arrPlanetsComFilDeNome, arrayNumericFilters);

    return (
      <div>
        <PlanetsList />
        <table>
          <THead />
          <tbody>
            {arrTodoFiltrado.map((planet) => (
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
  arrayNumericFilters: state.filters.slice(1).map((obj) => obj.numericValues) || [],
  arrayPlanetas: state.data.arrPlanetas,
  texto: state.filters[0].name,
});

Table.propTypes = {
  arrayPlanetas: propTypes.instanceOf(Array).isRequired,
  arrayNumericFilters: propTypes.instanceOf(Array).isRequired,
  texto: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Table);

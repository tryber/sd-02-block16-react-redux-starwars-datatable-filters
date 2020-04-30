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
  return arrayPlanetasFiltrado;
}

const callbackParaSortName = (objPlanet1, objPlanet2) => (
  objPlanet1.name > objPlanet2.name ? 1 : -1
);

const callbackParaSortNumeros = (objPlanet1, objPlanet2, column) => (
  Number(objPlanet1[column]) > Number(objPlanet2[column]) ? 1 : -1
);

function ordenarArray(arrTodoFiltrado, objOrdenacao) {
  const { column, order } = objOrdenacao;

  const arrayOrdenado = arrTodoFiltrado;

  if (column === 'name') {
    arrayOrdenado.sort(
      callbackParaSortName,
    );
  } else {
    arrayOrdenado.sort(
      (obj1, obj2) => callbackParaSortNumeros(obj1, obj2, column),
    );
  }

  if (order === 'DESC') {
    arrayOrdenado.reverse();
  }

  return arrayOrdenado;
}

class Table extends React.Component {
  static renderTBody(arrayOrdenado) {
    return (
      <tbody>
        {arrayOrdenado.map((planet) => (
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
    );
  }

  render() {
    const {
      arrayPlanetas, texto, arrayNumericFilters, objOrdenacao,
    } = this.props;
    const arrPlanetsComFilDeNome = filtrarPlanetasPorNome(arrayPlanetas, texto);
    const arrTodoFiltrado = filtrarTodasAsComparacoes(arrPlanetsComFilDeNome, arrayNumericFilters);
    const arrayOrdenado = ordenarArray(arrTodoFiltrado, objOrdenacao);

    return (
      <div>
        <PlanetsList />
        <table>
          <THead />
          {Table.renderTBody(arrayOrdenado)}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  arrayNumericFilters: state.filters.slice(1).map((obj) => obj.numericValues) || [],
  arrayPlanetas: state.data.arrPlanetas,
  texto: state.filters[0].name,
  objOrdenacao: state.sort,
});

Table.propTypes = {
  arrayPlanetas: propTypes.instanceOf(Array).isRequired,
  arrayNumericFilters: propTypes.instanceOf(Array).isRequired,
  texto: propTypes.string.isRequired,
  objOrdenacao: propTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(Table);

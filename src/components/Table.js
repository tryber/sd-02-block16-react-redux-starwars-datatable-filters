import React from 'react';
import PropTypes from 'prop-types';
import requestSWAPIdata from '../services/SWAPI';

const tableTitle = [
  'Name',
  'Rotation Period',
  'Orbital Period',
  'Diameter',
  'Climate',
  'Gravity',
  'Terrain',
  'Surface Water',
  'Population',
  'Films',
  'Created',
  'Edited',
  'URL',
];

class Table extends React.Component {
  componentDidMount() {
    requestSWAPIdata().then(
      (apiInfo) => console.log(apiInfo),
      (errorMessage) => console.log(errorMessage, 'Não deu'),
    );
  }

  render() {
    const { planetsData } = this.props;
    return (
      <div className="allTable">
        <table>

          <thead>
            <tr>
              {tableTitle.map((title) => (
                <th key={title}>{title}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {planetsData.map((planet) => (
              <tr key={`${planet.name} row`}>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films.map((film) => <p key={film}>{film}</p>)}</td>
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

export default Table;

Table.propTypes = {
  planetsData: PropTypes.arrayOf,
};

Table.defaultProps = {
  planetsData: [],
};

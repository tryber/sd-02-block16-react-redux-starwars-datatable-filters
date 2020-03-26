import React from 'react';
import { connect } from 'react-redux';

const PlanetsList = ({ results }) => {
  function tableHead() {
    return (
      <div>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
      </div>
    );
  }

  function tableBody() {
    return (
      <tbody>
        {results.map((planet) => (
          <tr key={planet.name}>
            <td className="name-line">{planet.name}</td>
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
  return (
    <div>
      <table>
        {tableHead()}
        {tableBody()}
      </table>
    </div>
  );
};

const mapStateToProps = ({ data: { results } }) => ({ results });

export default connect(mapStateToProps)(PlanetsList);

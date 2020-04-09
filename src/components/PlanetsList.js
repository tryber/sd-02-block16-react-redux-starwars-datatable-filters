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
    console.log(results)
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

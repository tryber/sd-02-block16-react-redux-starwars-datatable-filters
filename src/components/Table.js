import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import resultAPI from '../store/loadAction';
import planetAction from '../store/planetAction';
import store from '../store';
import './Table.css';

const headTable = () => {
  const { loadReducer: { data: { results } } } = store.getState();
  return (
    <thead>
      <tr>
        {Object.keys(results[0]).map((result) => ((result !== 'residents')
          ? <th className="headTable" key={result}>{result.replace(/_/g, ' ')}</th>
          : null))
        }
      </tr>
    </thead>
  );
};

const cellTable = () => {
  const { loadReducer: { dataMock: { results } } } = store.getState();
  return (
    results.map((result) => (
      <tbody key={result.name}>
        <tr>
          {Object.values(result).map((item, index) => {
            if (index !== 9) {
              return (
                <td key={item}>{item}</td>
              );
            }
            return null;
          })}
        </tr>
      </tbody>
    ))
  );
};

const selectDropdown = () => {
  return (
    <form>
      <label>
        <select onClick={(e) => console.log(e.target.options[e.target.selectedIndex].text)}>
          <option value='1'>population</option>
          <option value='2'>orbital_period</option>
          <option value='3'>diameter</option>
          <option value='4'>rotation_period</option>
          <option value='5'>surface_water</option>
        </select>
      </label>
    </form>
  );
}

const selectCondition = () => {
  return (
    <form>
      <label>
        <select onClick={(e) => console.log(e.target)}>
          <option value='1'>Maior que</option>
          <option value='2'>Menor que</option>
          <option value='3'>Igual a</option>
        </select>
      </label>
    </form>
  );
}

const filterPlanet = (e, dataPlanet, data) => {
  const planet = e.target.value;
  dataPlanet(planet, data);
};

class Table extends Component {

  componentDidMount() {
    const { dataAPI } = this.props;
    dataAPI();
  }

  render() {
    const { onLoad, data, dataMock, dataPlanet } = this.props;
    if (!onLoad) return <p>Loading...</p>;
    return (
      <div>
        <input type="text" onChange={(e) => filterPlanet(e, dataPlanet, data)} />
        {selectDropdown()}
        {selectCondition()}
        <input type="number" />
        <div>StarWars DataTable with Filters</div>
        <table>
          {headTable(data)}
          {cellTable(dataMock)}
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ loadReducer: { data, onLoad, dataMock } }) => ({ data, onLoad, dataMock });

const mapDispatchToProps = (dispatch) => ({
  dataAPI: () => dispatch(resultAPI()),
  dataPlanet: (planet, data) => dispatch(planetAction(planet, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  dataAPI: PropTypes.func.isRequired,
  dataPlanet: PropTypes.func.isRequired,
  onLoad: PropTypes.bool.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

Table.defaultProps = {
  data: [],
};

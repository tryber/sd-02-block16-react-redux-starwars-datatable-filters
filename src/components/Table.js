import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import resultAPI from '../store/loadAction';
import planetAction from '../store/planetAction';
import HeadTable from './Headtable';
import Celltable from './Celltable';
import './Table.css';

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
        <select onClick={(e) => console.log(e.target.options[e.target.selectedIndex].text)}>
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
    const { onLoad, data, dataPlanet } = this.props;
    if (!onLoad) return <p>Loading...</p>;
    return (
      <div>
        <input type="text" onChange={(e) => filterPlanet(e, dataPlanet, data)} />
        {selectDropdown()}
        {selectCondition()}
        <input type="number" onChange={(e) => console.log(e.target.value)}/>
        <div>StarWars DataTable with Filters</div>
        <table>
          <HeadTable />
          <Celltable />
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ loadReducer: { data, onLoad } }) => ({ data, onLoad });

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

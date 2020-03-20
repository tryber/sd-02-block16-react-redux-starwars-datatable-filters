import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import resultAPI from '../store/loadAction';
import planetAction from '../store/planetAction';
import HeadTable from './Headtable';
import Celltable from './Celltable';
import dispatchFilters from '../store/dispatchFilters';
import './Table.css';

const filterPlanet = (e, dataPlanet, data) => {
  const planet = e.target.value;
  dataPlanet(planet, data);
};

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      column: 'population',
      condition: 'Maior que',
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  selecDropDown = () => {
    return (
      <form>
        <label htmlFor="filterType">
          <select
            id="filterType"
            name="column"
            onChange={(e) => this.handleChange(e.target)}
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
      </form>
    );
  }

  selecCondition = () => {
    return (
      <form>
        <label htmlFor="conditionType">
          <select
            id="conditionType"
            name="condition"
            onChange={(e) =>
            this.handleChange(e.target)}
          >
            <option value="Maior que">Maior que</option>
            <option value="Menor que">Menor que</option>
            <option value="Igual a">Igual a</option>
          </select>
        </label>
      </form>
    );
  }

  handleSubmit() {
    const { column, condition, value } = this.state;
    const { updateFilters, dataMock } = this.props;
    updateFilters(column, condition, value, dataMock);
  }

  handleChange(event) {
    const { name, value } = event;
    this.setState({[name]: value})
  }

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
        {this.selecDropDown()}
        {this.selecCondition()}
        <input type="number" name="value" onChange={(e) => this.handleChange(e.target)} />
        <button onClick={() => this.handleSubmit()}>Search</button>
        <button>Clear</button>
        <div>StarWars DataTable with Filters</div>
        <table>
          <HeadTable />
          <Celltable />
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ loadReducer: { data, onLoad, updateFilters, dataMock } }) => ({
  data, onLoad, updateFilters, dataMock
});

const mapDispatchToProps = (dispatch) => ({
  dataAPI: () => dispatch(resultAPI()),
  dataPlanet: (planet, data) => dispatch(planetAction(planet, data)),
  updateFilters: (column, condition, value, dataMock) =>
    dispatch(dispatchFilters(column, condition, value, dataMock)),
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

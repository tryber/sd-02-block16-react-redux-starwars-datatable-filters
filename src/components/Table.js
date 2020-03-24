import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import resultAPI from '../store/loadAction';
import planetAction from '../store/planetAction';
import HeadTable from './Headtable';
import Celltable from './Celltable';
import dispatchFilters from '../store/dispatchFilters';
import './Table.css';

const filterPlanet = (e, dataPlanet, dataMock, dataMockFilterOn, data) => {
  const planet = e.target.value;
  dataPlanet(planet, dataMock, dataMockFilterOn, data);
};

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: 'population',
      condition: 'Maior que',
      value: '',
      popOn: false,
      orbOn: false,
      diamOn: false,
      rotOn: false,
      surfOn: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkBoolean = this.checkBoolean.bind(this);
  }

  componentDidMount() {
    const { dataAPI } = this.props;
    dataAPI();
  }

  selecDropDown() {
    return (
      <form>
        <label htmlFor="filterType">
          <select
            id="filterType"
            name="column"
            onChange={(e) => this.handleChange(e.target)}
            onClick={(e) => this.checkBoolean(e.target)}
          >
            <option value="population" name="popOn">population</option>
            <option value="orbital_period" name="orbOn">orbital_period</option>
            <option value="diameter" name="diamOn">diameter</option>
            <option value="rotation_period" name="rotOn">rotation_period</option>
            <option value="surface_water" name="surfOn">surface_water</option>
          </select>
        </label>
      </form>
    );
  }

  selecCondition() {
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

  checkBoolean(event) {
    console.log(this.state)
    //const { boolean } = event;
    console.log(event.options[event.selectedIndex].attributes.name.value)
    //this.setState({ [boolean]: true })
  }

  handleSubmit(data) {
    const { column, condition, value } = this.state;
    const { updateFilters } = this.props;
    updateFilters(column, condition, value, data);
  }

  handleChange(event) {
    const { name, value } = event;
    this.setState({ [name]: value });
  }

  render() {
    const { onLoad, data, dataPlanet, dataMockFilterOn, dataMock } = this.props;
    if (!onLoad) return <p>Loading...</p>;
    return (
      <div>
        <input
          type="text"
          onChange={(e) => filterPlanet(e, dataPlanet, dataMock, dataMockFilterOn, data)}
        />
        {this.selecDropDown()}
        {this.selecCondition()}
        <input
          type="number"
          name="value" onChange={(e) => this.handleChange(e.target)}
        />
        <button onClick={() => this.handleSubmit(data)}>Search</button>
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

const mapStateToProps = ({
  loadReducer: { data, onLoad, updateFilters, dataMock, dataMockFilterOn } }) => ({
    data, onLoad, updateFilters, dataMock, dataMockFilterOn,
  });

const mapDispatchToProps = (dispatch) => ({
  dataAPI: () => dispatch(resultAPI()),
  dataPlanet: (planet, dataMock, dataMockFilterOn, data) =>
    dispatch(planetAction(planet, dataMock, dataMockFilterOn, data)),
  updateFilters: (column, condition, value, data) =>
    dispatch(dispatchFilters(column, condition, value, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  dataAPI: PropTypes.func.isRequired,
  dataPlanet: PropTypes.func.isRequired,
  onLoad: PropTypes.bool.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  updateFilters: PropTypes.func.isRequired,
  dataMockFilterOn: PropTypes.bool.isRequired,
  dataMock: PropTypes.instanceOf(Object).isRequired,
};

Table.defaultProps = {
  data: [],
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import resultAPI from '../store/loadAction';
import planetAction from '../store/planetAction';
import HeadTable from './Headtable';
import Celltable from './Celltable';
import dispatchAllFilters from '../store/allFilters';
import store from '../store';
import './Table.css';

const filterPlanet = (e, dataPlanet, dataMock, dataMockFilterOn, data) => {
  const planet = e.target.value;
  dataPlanet(planet, dataMock, dataMockFilterOn, data);
};

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: '',
      condition: '',
      name: '',
      value: 0,
      popOn: false,
      orbOn: false,
      diamOn: false,
      rotOn: false,
      surfOn: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeBoolean = this.changeBoolean.bind(this);
    this.callFilters = this.callFilters.bind(this);
  }

  componentDidMount() {
    const { dataAPI } = this.props;
    dataAPI();
  }

  selecDropDown() {
    const { popOn, orbOn, diamOn, rotOn, surfOn } = this.state;
    return (
      <form>
        <label htmlFor="filterType">
          <select
            id="filterType"
            name="column"
            onChange={(e) => this.handleChange(e.target)}
            onClick={(e) => this.changeBoolean(e.target.options[e.target.selectedIndex])}
          >
            <option value ="" name="choose" hidden>Choose Option</option>
            <option value="population" name="popOn" hidden={popOn ? 'none' : ''}>
              population
            </option>
            <option value="orbital_period" name="orbOn" hidden={orbOn ? 'none' : ''}>
              orbital_period
            </option>
            <option value="diameter" name="diamOn" hidden={diamOn ? 'none' : ''}>
              diameter
            </option>
            <option value="rotation_period" name="rotOn" hidden={rotOn ? 'none' : ''}>
              rotation_period
            </option>
            <option value="surface_water" name="surfOn" hidden={surfOn ? 'none' : ''}>
              surface_water
            </option>
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
            <option value="" name="choose" hidden>Choose Option</option>
            <option value="Maior que">Maior que</option>
            <option value="Menor que">Menor que</option>
            <option value="Igual a">Igual a</option>
          </select>
        </label>
      </form>
    );
  }

  changeBoolean(event) {
    const name = event.attributes.name.value;
    this.setState({ name });
  }

  handleSubmit(data) {
    const { column, condition, value, name } = this.state;
    const { updateAllFilters } = this.props;
    this.setState({
      [name]: true,
      column: '',
    });
    updateAllFilters(column, condition, value, data);
  }

  handleChange(event) {
    const { name, value } = event;
    this.setState({ [name]: value });
  }

  callFilters(dataMockFilterOn) {
    const { filters } = this.props;
    if (dataMockFilterOn && filters) {
      return (
        <div className="essa1">
          {filters.map((filter) => {
            const filtered = (filter.numericValues)
            ? <div className="essa2" key={filter.numericValues.column}>
                <p>{filter.numericValues.column}</p>
                <p>{filter.numericValues.condition}</p>
                <p>{filter.numericValues.value}</p>
                <button>X</button>
              </div>
            : '';
            return filtered;
            })
          }
        </div>
      );
    };
  }

  render() {
    const { value, condition, column } = this.state;
    const { onLoad, data, dataPlanet, dataMockFilterOn, dataMock, filters } = this.props;
    if (!onLoad) return <p>Loading...</p>;
    return (
      <div>
        <input
          type="text"
          onChange={(e) => filterPlanet(e, dataPlanet, dataMock, dataMockFilterOn, data, filters)}
        />
        {this.selecDropDown()}
        {this.selecCondition()}
        <input
          type="number"
          name="value"
          value={value}
          onChange={(e) => this.handleChange(e.target)}
        />
        <button
          onClick={() => this.handleSubmit(data)} disabled={(condition && column) ? '' : 'none'}
        > Search
        </button>
        <div>StarWars DataTable with Filters</div>
        <div className="filteredButtons">
          {this.callFilters(dataMockFilterOn)}
        </div>
        <table>
          <HeadTable />
          <Celltable />
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({
  loadReducer: { data, onLoad, updateFilters, dataMock, dataMockFilterOn, filters } }) => ({
    data, onLoad, updateFilters, dataMock, dataMockFilterOn, filters
  });

const mapDispatchToProps = (dispatch) => ({
  dataAPI: () => dispatch(resultAPI()),
  dataPlanet: (planet, dataMock, dataMockFilterOn, data) =>
    dispatch(planetAction(planet, dataMock, dataMockFilterOn, data)),
  updateAllFilters: (column, condition, value, data) =>
    dispatch(dispatchAllFilters(column, condition, value, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  dataAPI: PropTypes.func.isRequired,
  dataPlanet: PropTypes.func.isRequired,
  onLoad: PropTypes.bool.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  dataMockFilterOn: PropTypes.bool.isRequired,
  dataMock: PropTypes.instanceOf(Object).isRequired,
};

Table.defaultProps = {
  data: [],
};

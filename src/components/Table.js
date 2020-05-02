import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import resultAPI from '../store/loadAction';
import planetAction from '../store/planetAction';
import HeadTable from './Headtable';
import Celltable from './Celltable';
import dispatchAllFilters from '../store/allFilters';
import filtersRemove from '../store/removeAction';
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
      value: '',
      arrDrop: ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
      colOn: false,
      condOn: false,
      valOn: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeBoolean = this.changeBoolean.bind(this);
    this.callFilters = this.callFilters.bind(this);
    this.inputNumber = this.inputNumber.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
  }

  componentDidMount() {
    const { dataAPI } = this.props;
    dataAPI();
  }

  selecDropDown() {
    const { arrDrop } = this.state;
    return (
      <form>
        <label htmlFor="filterType">
          <select
            id="filterType"
            name="column"
            onChange={(e) => this.handleChange(e.target)}
            onClick={(e) => this.changeBoolean(e.target.options[e.target.selectedIndex].attributes.name.value)}
          >
            <option value="" name="Choose" hidden>Choose Option</option>
            {
              arrDrop.map((arr) => (
                <option key={arr} value={arr} name="colOn">{arr}</option>
              ))
            }
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
            onClick={(e) => this.changeBoolean(e.target.options[e.target.selectedIndex].attributes.name.value)}
          >
            <option value="Choose" name="Choose" hidden>Choose Option</option>
            <option value="Maior que" name="condOn">Maior que</option>
            <option value="Menor que" name="condOn">Menor que</option>
            <option value="Igual a" name="condOn">Igual a</option>
          </select>
        </label>
      </form>
    );
  }

  changeBoolean(name) {
    this.setState({ [name]: true });
  }

  handleSubmit(data, filters) {
    const { column, condition, value, name, arrDrop } = this.state;
    const { updateAllFilters } = this.props;
    const newArr = arrDrop.filter((arr) => arr !== column);
    this.setState({
      ['colOn']: false,
      ['valOn']: false,
      value: '',
      column: '',
      arrDrop: newArr,
    });
    updateAllFilters(column, condition, value, data, filters);
  }

  handleChange(event) {
    const { name, value } = event;
    (name === 'value')
    ? this.setState(() => ({ value: (value >= 0) ? value : 0 }))
    : this.setState({ [name]: value });
  }

  removeFilter(filters, name) {
    console.log(filters)
    const { updateRemoveFilters, dataMock } = this.props;
    const { arrDrop } = this.state;
    this.setState({arrDrop: [name, ...arrDrop]});
  }

  callFilters(dataMockFilterOn) {
    const { filters } = this.props;
    if (dataMockFilterOn && filters) {
      return (
        <div className="essa1">
          {filters.map((filter) => {
            const filtered = (filter.numericValues)
            ? (<div
                className="essa2"
                key={filter.numericValues.column}
              >
              <div>{filter.numericValues.column}</div>
              <div>{filter.numericValues.condition}</div>
              <div>{filter.numericValues.value}</div>
              <button
                onClick={() => 
                  this.removeFilter(filters, filter.numericValues.column)}
              >X
              </button>
            </div>)
            : '';
            return filtered;
          })
          }
        </div>
      );
    }
    return (
      <div />
    );
  }

  inputNumber() {
    const { value } = this.state;
    return (
      <div>
        <input
          type="number"
          name="value"
          value={value}
          onChange={(e) => {
            this.changeBoolean('valOn')
            return this.handleChange(e.target)
          }}
        />
      </div>
    );
  }

  render() {
    const { colOn, condOn, valOn } = this.state;
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
        {this.inputNumber()}
        <button
          onClick={() => this.handleSubmit(data, filters)} disabled={(colOn && condOn && valOn) ? '' : 'none'}
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
    data, onLoad, updateFilters, dataMock, dataMockFilterOn, filters,
  });

const mapDispatchToProps = (dispatch) => ({
  dataAPI: () => dispatch(resultAPI()),
  dataPlanet: (planet, dataMock, dataMockFilterOn, data) =>
    dispatch(planetAction(planet, dataMock, dataMockFilterOn, data)),
  updateAllFilters: (column, condition, value, data) =>
    dispatch(dispatchAllFilters(column, condition, value, data)),
  updateRemoveFilters: (column, condition, value, dataMock) =>
    dispatch(filtersRemove(column, condition, value, dataMock)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  dataAPI: PropTypes.func.isRequired,
  dataPlanet: PropTypes.func.isRequired,
  updateRemoveFilters: PropTypes.func.isRequired,
  updateAllFilters: PropTypes.func.isRequired,
  onLoad: PropTypes.bool.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  dataMockFilterOn: PropTypes.bool.isRequired,
  dataMock: PropTypes.instanceOf(Object).isRequired,
  filters: PropTypes.instanceOf(Object).isRequired,
};

Table.defaultProps = {
  data: [],
  filters: [],
};

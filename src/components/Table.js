import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkPlanets, filterText } from '../actions/APIactions';
import { eraseFilter } from '../actions/dropdownActions';
import Dropdowns from './Dropdowns';
import './Table.css';

class Table extends Component {
  static numericFilters(array, { numericValues }) {
    const { column, comparison, value } = numericValues;
    const columnValue = (column !== '' && value !== '');
    if (comparison === 'more than' && columnValue) {
      return array.filter((planet) => Number(planet[column]) > Number(value));
    }
    if (comparison === 'less than' && columnValue) {
      return array.filter((planet) => Number(planet[column]) < Number(value));
    }
    if (comparison === 'equal to' && columnValue) {
      return array.filter((planet) => Number(planet[column]) === Number(value));
    }
    return array;
  }

  static generateBody(data, text, filterCriteria) {
    let firstFilter = data;
    filterCriteria.forEach((x) => { firstFilter = Table.numericFilters(firstFilter, x); });
    return (
      firstFilter
        .filter(({ name }) => name.toLowerCase().includes(text.toLowerCase()))
        .map((values) => (
          <tbody key={values.name}>
            <tr>
              {Object.values(values).map((box, index) => (index !== 9
                ? <td className="tableData" key={box}>{box}</td>
                : null))}
            </tr>
          </tbody>
        )));
  }

  static generateTable(loadInfo, data, failLoad, filtered, text, filterCriteria) {
    if (!loadInfo && data) {
      return (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((item) => (item !== 'residents'
                ? <th className="tableHeader" key={item}>{item}</th>
                : null))}
            </tr>
          </thead>
          {!filtered
            ? Table.generateBody(data, text, filterCriteria)
            : Table.generateBody(filtered, text, filterCriteria)}
        </table>
      );
    }
    if (failLoad) { return <div>{failLoad}</div>; }
    return <div>Loading...</div>;
  }

  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.showFilters = this.showFilters.bind(this);
  }

  componentDidMount() {
    const { importedThunk } = this.props;
    importedThunk();
  }

  onChangeHandler(event) {
    const { filterByText } = this.props;
    let { data } = this.props;
    const text = event.target.value.toLowerCase();
    filterByText(text, data);
    data = filterByText(text, data).results;
  }

  showFilters(filters) {
    console.log(this);
    console.log('filters:', filters);
    const { eraseColumn } = this.props;
    return filters[0].numericValues.column && filters
      .map(({ numericValues }) => (
        <div>
          <p>{numericValues.column}</p>
          <p>{numericValues.comparison}</p>
          <p>{numericValues.value}</p>
          <button
            type="button"
            value={numericValues.column}
            onClick={() => eraseColumn(filters, numericValues.column)}
          >
            Erase Filter
          </button>
        </div>
      ));
  }

  render() {
    const {
      loading,
      data,
      error,
      filtered,
      textFilter,
      filters,
    } = this.props;
    return (
      <div>
        <h1>Star Wars - A New Saga begins!</h1>
        <input onChange={this.onChangeHandler} />
        <Dropdowns />
        <h2>Filters:</h2>
        {this.showFilters(filters)}
        {Table.generateTable(loading, data, error, filtered, textFilter[0].name, filters)}
      </div>
    );
  }
}

const mapStateToProps = ({
  APIreducer: {
    loading,
    data,
    error,
  },
  textReducer: {
    filtered,
    filters: textFilter,
  },
  dropdownReducer: {
    filters,
  },
}) => ({
  loading, data, error, filtered, textFilter, filters,
});

const mapDispatchToProps = (dispatch) => ({
  importedThunk: () => dispatch(thunkPlanets()),
  filterByText: (typing, data) => dispatch(filterText(typing, data)),
  eraseColumn: (array, column) => dispatch(eraseFilter(array, column)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  importedThunk: propTypes.func.isRequired,
  filterByText: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
  data: propTypes.arrayOf(propTypes.object),
  error: propTypes.string,
  filtered: propTypes.arrayOf(propTypes.object),
  textFilter: propTypes.arrayOf(propTypes.object),
  filters: propTypes.arrayOf(propTypes.object),
  eraseColumn: propTypes.func.isRequired,
};

Table.defaultProps = {
  data: null,
  error: null,
  filtered: null,
  textFilter: '',
  filters: '',
};

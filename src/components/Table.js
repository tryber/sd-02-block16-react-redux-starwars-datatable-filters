import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkPlanets, filterText } from '../actions/APIactions';
import Dropdowns from './Dropdowns';
import './Table.css';

class Table extends Component {
  static numericFilters(array, filterCriteria) {
    const { numericValues: { column, comparison, value } } = filterCriteria[0];
    const columnValue = (column !== '' && value !== '');
    if (comparison === 'more than' && columnValue) {
      return array.filter((planet) => planet[column] > value);
    }
    if (comparison === 'less than' && columnValue) {
      return array.filter((planet) => planet[column] < value);
    }
    if (comparison === 'equal to' && columnValue) {
      return array.filter((planet) => planet[column] === value);
    }
    return array;
  }

  static generateBody(data, text, filterCriteria) {
    const firstFilter = Table.numericFilters(data, filterCriteria);
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

  render() {
    const {
      loading,
      data,
      error,
      filtered,
      textFilter,
      filters,
    } = this.props;
    console.log('textFilter:', textFilter);
    console.log('filters', filters);
    return (
      <div>
        <h1>Star Wars - A New Saga begins!</h1>
        <input onChange={this.onChangeHandler} />
        <Dropdowns />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  importedThunk: propTypes.func.isRequired,
  filterByText: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
  data: propTypes.arrayOf(propTypes.string),
  error: propTypes.string,
  filtered: propTypes.string,
};

Table.defaultProps = {
  data: [],
  error: '',
  filtered: '',
};

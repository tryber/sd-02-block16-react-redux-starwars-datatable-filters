import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkPlanets, filterText } from '../actions/APIactions';
import Dropdowns from './Dropdowns';
import './Table.css';

class Table extends Component {
  constructor(props) {
    super(props);
    this.generateTable = this.generateTable.bind(this);
    this.generateBody = this.generateBody.bind(this);
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

  generateBody(data) {
    console.log(this);
    return (
      data.map((values) => (
        <tbody key={values.name}>
          <tr>
            {Object.values(values).map((box, index) => (index !== 9
              ? <td className="tableData" key={box}>{box}</td>
              : null))}
          </tr>
        </tbody>
      )));
  }

  generateTable(loadInfo, data, failLoad, filtered) {
    console.log(this);
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
          {!filtered ? this.generateBody(data) : this.generateBody(filtered)}
        </table>
      );
    }
    if (failLoad) { return <div>{failLoad}</div>; }
    return <div>Loading...</div>;
  }

  render() {
    const {
      loading,
      data,
      error,
      filtered,
    } = this.props;
    return (
      <div>
        <h1>Star Wars - A New Saga begins!</h1>
        <input onChange={this.onChangeHandler} />
        <Dropdowns />
        {this.generateTable(loading, data, error, filtered)}
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
  },
}) => ({
  loading, data, error, filtered,
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
  data: '',
  error: '',
  filtered: '',
};

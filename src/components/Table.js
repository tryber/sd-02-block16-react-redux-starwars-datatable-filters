import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkPlanets } from '../actions/APIactions';
import './Table.css';

function generateTable(loadInfo, data, failLoad) {
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
        {data.map((values) => (
          <tbody key={values.name}>
            <tr>
              {Object.values(values).map((box, index) => (index !== 9
                ? <td className="tableData" key={box}>{box}</td>
                : null))}
            </tr>
          </tbody>
        ))}
      </table>
    );
  }
  if (failLoad) { return <div>Failed to fetch planets!</div>; }
  return <div>Loading...</div>;
}

class Table extends Component {
  componentDidMount() {
    const { importedThunk } = this.props;
    importedThunk();
  }

  render() {
    const { loading, data, error } = this.props;
    return (
      <div>
        <h1>Star Wars - A New Saga begins!</h1>
        {generateTable(loading, data, error)}
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
}) => ({
  loading, data, error,
});

const mapDispatchToProps = (dispatch) => ({
  importedThunk: () => dispatch(thunkPlanets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  importedThunk: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
  data: propTypes.arrayOf(propTypes.string),
  error: propTypes.string,
};

Table.defaultProps = {
  data: '',
  error: '',
};

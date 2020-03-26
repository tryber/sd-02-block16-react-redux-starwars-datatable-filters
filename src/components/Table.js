import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkPlanets } from '../actions';
import { filterText } from '../actions/textActions';
import Dropdowns from './Dropdowns';
import './Table.css';

function filterByColumns(array, filterCriteria) {
  const { numericValues: { column, comparison, value } } = filterCriteria[0];
  const columAndValue = function () { return column !== '' && value !== ''; };
  if (comparison === 'more than' && columAndValue()) {
    return array.filter((planet) => Number(planet[column]) > value);
  }
  if (comparison === 'less than' && columAndValue()) {
    return array.filter((planet) => Number(planet[column]) < value);
  }
  if (comparison === 'equal' && columAndValue()) {
    return array.filter((planet) => (Number(planet[column]) === value));
  }
  return array;
}

function generateBody(param, text, filterCriteria) {
  const firstFilter = filterByColumns(param, filterCriteria);
  return (
    firstFilter
      .filter(({ name }) => name.toLowerCase().includes(text.toLowerCase()))
      .map((values) => (
        <tbody key={values.name}>
          <tr>
            {Object.values(values)
              .map((body, index) => (index !== 9
                ? <td className="tableData" key={body}>{body}</td>
                : null))}
          </tr>
        </tbody>
      ))
  );
}

function generateTable(fetch, planets, fail, filter, columnfilter) {
  if (!fetch && planets) {
    return (
      <table>
        <thead>
          <tr>
            {Object.keys(planets[0])
              .map((attribute) => (attribute !== 'residents'
                ? <th className="tableHeader" key={attribute}>{attribute}</th>
                : null))}
          </tr>
        </thead>
        {generateBody(planets, filter, columnfilter)}
      </table>
    );
  }
  if (!fetch && fail) {
    return (<p>Error! API failed!</p>);
  }
  return (<p>Loading...</p>);
}

class Table extends React.Component {
  componentDidMount() {
    const { importedThunk } = this.props;
    importedThunk();
  }

  render() {
    const {
      fetching, data, error, filters, importedTextReducer, numericFilters,
    } = this.props;
    const { name } = filters[0];
    return (
      <div className="tableComponent">
        <h1>StarWars Data Table (with Filters)</h1>
        <input value={name} onChange={(e) => importedTextReducer(e.target.value)} />
        <Dropdowns />
        {generateTable(fetching, data, error, name, numericFilters)}
      </div>
    );
  }
}

const mapStateToProps = ({
  showPlanetsReducer: {
    fetching,
    data,
    error,
  },
  filterTextReducer: {
    filters,
  },
  columnsReducer: {
    filters: numericFilters,
  },
}) => ({
  fetching, data, error, filters, numericFilters,
});

const mapDispatchToProps = (dispatch) => ({
  importedThunk: () => dispatch(thunkPlanets()),
  importedTextReducer: (typing) => dispatch(filterText(typing)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  importedThunk: propTypes.func.isRequired,
  fetching: propTypes.bool.isRequired,
  data: propTypes.arrayOf(propTypes.object),
  error: propTypes.string,
  filters: propTypes.instanceOf(Array),
  importedTextReducer: propTypes.func.isRequired,
  numericFilters: propTypes.instanceOf(Array).isRequired,
};

Table.defaultProps = {
  data: null,
  error: null,
  filters: [],
};

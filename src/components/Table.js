import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Selectors from './Selectors';
import FilterBox from './FilterBox';
import './Table.css';

import { fetchSWplanets } from '../store/actions';
import { filterByName, createResults } from '../store/actions/table';

class Table extends Component {
  componentDidMount() {
    const { getCurrentSwPlanets, setResultsByName } = this.props;

    getCurrentSwPlanets()
      .then(({ results }) => setResultsByName(results));
  }

  indexContent() {
    const { resultsByName } = this.props;
    const residentsIndex = Object.keys(resultsByName[0] || []).findIndex((element) => element === 'residents');

    return (
      resultsByName.map((elements) => (
        <tbody key={elements.name}>
          <tr>
            {Object.values(elements).map((values, i) => {
              if (i !== residentsIndex) {
                return (
                  <td className="table-values-content" key={values}>{values}</td>
                );
              }
              return null;
            })}
          </tr>
        </tbody>
      ))
    );
  }

  render() {
    const {
      isFetching, results, getFilterByName, resultsByName, filters,
    } = this.props;
    if (isFetching) return <div>LOADING...</div>;
    return (
      <div>
        <input type="text" placeholder="Digite um nome " onChange={(e) => getFilterByName(e, results)} />
        <label htmlFor="values">Choose a filter:</label>
        <Selectors selects={['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']} i={0} />
        <Selectors selects={['maior que', 'menor que', 'igual a']} i={1} />
        <FilterBox />
        <table className="table-content">
          <caption>STAR WARS PLANETS</caption>
          <thead>
            <tr>
              {Object.keys(resultsByName[0] || []).map((keys) => {
                if (keys !== 'residents') {
                  return (
                    <th className="table-index-content" key={keys}>{keys}</th>
                  );
                }
                return null;
              })}
            </tr>
          </thead>
          {this.indexContent()}
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({
  data: {
    isFetching,
    results,
  },
  table: {
    resultsByName,
    filters,
  },
}) => ({
  resultsByName,
  filters,
  isFetching,
  results,
});

const mapDispatchToProps = (dispatch) => ({
  setResultsByName: (results) => dispatch(createResults(results)),
  getCurrentSwPlanets: () => dispatch(fetchSWplanets()),
  getFilterByName: (event, results) => dispatch(filterByName(event, results)),
});

Table.propTypes = {
  setResultsByName: PropTypes.func.isRequired,
  getCurrentSwPlanets: PropTypes.func.isRequired,
  getFilterByName: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  results: PropTypes.instanceOf(Array),
  resultsByName: PropTypes.instanceOf(Array).isRequired,
};

Table.defaultProps = {
  results: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);

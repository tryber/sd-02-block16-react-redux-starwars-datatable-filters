import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Selectors from './Selectors';
import './Table.css';

import { fetchSWplanets, filterPlanets } from '../store/actions';

class Table extends Component {
  componentDidMount() {
    const { getCurrentSwPlanets } = this.props;

    getCurrentSwPlanets()
      .then(({ results }) => sessionStorage.setItem('planets', JSON.stringify(results)));
  }

  indexContent() {
    const { results } = this.props;
    const residentsIndex = Object.keys(results[0] || []).findIndex((element) => element === 'residents');

    return (
      results.map((elements) => (
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
      isFetching, results, filterPlanet,
    } = this.props;

    if (isFetching) return <div>LOADING...</div>;
    return (
      <div>
        <input type="text" placeholder="Digite o nome do planeta" onChange={(e) => filterPlanet(e)} />
        <label htmlFor="values">Choose a filter:</label>
        <Selectors selects={['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']} i={0} />
        <Selectors selects={['maior que', 'menor que', 'igual a']} i={1} />
        <table className="table-content">
          <caption>STAR WARS PLANETS</caption>
          <thead>
            <tr>
              {Object.keys(results[0] || []).map((keys) => {
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
    filters,
    results,
  },
}) => ({
  isFetching,
  filters,
  results,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentSwPlanets: () => dispatch(fetchSWplanets()),
  filterPlanet: (event) => dispatch(filterPlanets(event)),
});

Table.propTypes = {
  getCurrentSwPlanets: PropTypes.func.isRequired,
  filterPlanet: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  results: PropTypes.instanceOf(Array),
};

Table.defaultProps = {
  results: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);

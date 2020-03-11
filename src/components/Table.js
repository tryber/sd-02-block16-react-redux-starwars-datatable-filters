import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import apiReturn from '../actions';
import Loading from './Loading';
import '../styles/Table.css';
import Input from './InputTextSearch';

const tableTitle = [
  'Name',
  'Rotation Period',
  'Orbital Period',
  'Diameter',
  'Climate',
  'Gravity',
  'Terrain',
  'Surface Water',
  'Population',
  'Films',
  'Created',
  'Edited',
  'URL',
];

class Table extends React.Component {
  componentDidMount() {
    const { initialRequisition } = this.props;
    initialRequisition();
  }

  render() {
    const { planetsData, isFetching, filteredData } = this.props;
    const consumerData = filteredData || planetsData;
    console.log(filteredData);
    console.log(planetsData);
    // console.log(typeof filteredData);
    if (isFetching) {
      return <Loading />;
    }

    return (
      <div className="allTable">
        <Input planetsData={planetsData} />
        <table>

          <thead>
            <tr>
              {tableTitle.map((title) => (
                <th key={title}>{title}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {consumerData && consumerData.map((planet) => (
              <tr key={`${planet.name} row`}>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films.map((film) => <p key={film}>{film}</p>)}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    );
  }
}

const mapStateToProps = (
  {
    returnInitialAPI: { isFetching, planetsData },
    returnFilterData: { filteredData },
  },
) => ({
  isFetching,
  planetsData,
  filteredData,
});

const mapDispatchToProps = (dispatch) => ({
  initialRequisition: () => dispatch(apiReturn()),
});

Table.propTypes = {
  planetsData: PropTypes.arrayOf,
  initialRequisition: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

Table.defaultProps = {
  planetsData: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);

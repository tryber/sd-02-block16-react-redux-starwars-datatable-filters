import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import PlanetsList from './PlanetsList';
import { fetchSwPlanets } from '../store/actions/APIaction';
import { getResults } from '../store/actions/filterAction';
import TableFilters from './TableFilters';

class Table extends Component {
  componentDidMount() {
    const { fetchApi, setFilterResults } = this.props;

    fetchApi()
      .then(({ results }) => setFilterResults(results));
  }

  render() {
    const { isFetching } = this.props;

    if (isFetching) return <div>LOADING...</div>;
    return (
      <div>
        <TableFilters />
        <PlanetsList />
      </div>
    );
  }
}

const mapStateToProps = ({
  data: {
    isFetching,
  },
}) => ({
  isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  setFilterResults: (results) => dispatch(getResults(results)),
  fetchApi: () => dispatch(fetchSwPlanets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  isFetching: propTypes.bool.isRequired,
  fetchApi: propTypes.func.isRequired,
  setFilterResults: propTypes.func.isRequired,
};

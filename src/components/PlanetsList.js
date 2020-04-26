import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchSWPlanets } from '../actions/APIActions';

class PlanetsList extends React.Component {
  componentDidMount() {
    const { fetchApi } = this.props;
    fetchApi();
  }

  render() {
    const { results, isFetching } = this.props;
    console.log(results, isFetching);
    if (isFetching) return <p>Loading...</p>;
    return (
 
    );
  }
}

const mapStateToProps = (state) => {
  const { data: { isFetching, results } } = state;
  return {
    isFetching,
    results,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchApi: () => dispatch(fetchSWPlanets()),
});


PlanetsList.propTypes = {
  results: propTypes.instanceOf(Array).isRequired,
  isFetching: propTypes.bool.isRequired,
  fetchApi: propTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanetsList);

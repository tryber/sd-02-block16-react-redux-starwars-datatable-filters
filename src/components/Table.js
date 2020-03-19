import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import PlanetsList from './PlanetsList';
import { fetchSwPlanets } from '../actions/APIactions';

class Table extends React.Component {
  componentDidMount() {
    const { fetchApi } = this.props;
    fetchApi();
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div>
        {isFetching ? <p>Loading...</p> : <PlanetsList />}
      </div>
    );
  }
}

const mapStateToProps = ({ data: { isFetching } }) => ({ isFetching });

const mapDispatchToProps = (dispatch) => ({
  fetchApi: () => dispatch(fetchSwPlanets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  fetchApi: propTypes.func.isRequired,
  isFetching: propTypes.bool.isRequired,
};

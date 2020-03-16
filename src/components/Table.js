import React from 'react';
import PlanetsList from './PlanetsList';
import propTypes from 'prop-types';
import { fetchSwPlanets } from '../actions/APIactions';
import { connect } from 'redux';

class Table extends React.Component {
  componentDidMount {
  const { fetchApi } = this.props;
  fetchApi();
}

render() {
  return (
    <div>
      <PlanetsList />
    </div>
  );
}
}

const mapStateToProps = ({
  data: {
    isFetching,
  },
  )} => ({
  isFetching
});

const mapDispatchToProps = (dispatch) => ({
  fetchApi: () => dispatch(fetchSwPlanets);
});

export default connect(null, mapDispatchToProps)(Table);

Table.propTypes = {
  fetchApi: propTypes.func.isRequired;
}

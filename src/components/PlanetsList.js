import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import getPlanets from '../services/SWAPI';

const fetchAPIDispatchsAssincronos = () => (
  (dispatch) => {
    dispatch({ type: 'COMECAR_REQUISICAO' });
    return getPlanets()
      .then(
        (data) => dispatch({ type: 'SUCESSO_NA_API', arrayPlanetas: data.results }),
        (error) => dispatch({ type: 'ERRO_NA_API', error: error.message }),
      );
  }
);

class PlanetsList extends React.Component {
  componentDidMount() {
    const { arrayPlanetas, dispatch } = this.props;
    if (arrayPlanetas.length === 0) {
      dispatch(fetchAPIDispatchsAssincronos());
    }
  }

  render() {
    return (
      null
    );
  }
}

PlanetsList.propTypes = {
  dispatch: propTypes.func.isRequired,
  arrayPlanetas: propTypes.instanceOf(Array).isRequired,
};

export default connect((state) => ({
  arrayPlanetas: state.data.arrPlanetas,
}))(PlanetsList);

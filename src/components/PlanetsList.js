import React from 'react';
import { connect } from 'react-redux';
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
    const { dispatch } = this.props;
    dispatch(fetchAPIDispatchsAssincronos());
  }

  render() {
    return (
      null
    );
  }
}

export default connect()(PlanetsList);

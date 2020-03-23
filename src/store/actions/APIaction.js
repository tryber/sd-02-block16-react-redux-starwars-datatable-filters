import getCurrentSwPlanets from '../../services/swAPI';

export const RESQUEST_SW_PLANETS = 'RESQUEST_SW_PLANETS';
export const RESQUEST_SW_PLANETS_SUCCESS = 'RESQUEST_SW_PLANETS_SUCCESS';
export const RESQUEST_SW_PLANETS_FAILURE = 'RESQUEST_SW_PLANETS_FAILURE';

const requestSWPlanets = () => ({
  type: RESQUEST_SW_PLANETS,
});

const requestSWPlanetsSuccess = ({ results }) => ({
  type: RESQUEST_SW_PLANETS_SUCCESS,
  results,
});

const requestSWPlanetsFailure = (error) => ({
  type: RESQUEST_SW_PLANETS_FAILURE,
  error,
});

export function fetchSwPlanets() {
  return (dispatch) => {
    dispatch(requestSWPlanets());

    return getCurrentSwPlanets()
      .then(
        (planets) => dispatch(requestSWPlanetsSuccess(planets)),
        (error) => dispatch(requestSWPlanetsFailure(error.message)),
      );
  };
}

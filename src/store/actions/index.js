import getCurrentSwPlanets from '../../services/swAPI';

export const REQUEST_SW_PLANETS = 'REQUEST_SW_PLANETS';
export const REQUEST_SW_PLANETS_SUCCESS = 'REQUEST_SW_PLANETS_SUCCESS';
export const REQUEST_SW_PLANETS_FAILURE = 'REQUEST_SW_PLANETS_FAILURE';


const requestSWplanets = () => ({
  type: REQUEST_SW_PLANETS,
});

const receiveSWplanetsSuccess = ({ results }) => ({
  type: REQUEST_SW_PLANETS_SUCCESS,
  results,
});

const receiveSWplanetsFailure = (error) => ({
  type: REQUEST_SW_PLANETS_FAILURE,
  error,
});

export function fetchSWplanets() {
  return (dispatch) => {
    dispatch(requestSWplanets());

    return getCurrentSwPlanets()
      .then(
        (planets) => dispatch(receiveSWplanetsSuccess(planets)),
        (error) => dispatch(receiveSWplanetsFailure(error.message)),
      );
  };
}

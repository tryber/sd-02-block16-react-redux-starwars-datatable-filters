import getCurrentSwPlanets from '../../services/swAPI';

export const REQUEST_SW_PLANETS = 'REQUEST_SW_PLANETS';
export const REQUEST_SW_PLANETS_SUCCESS = 'REQUEST_SW_PLANETS_SUCCESS';
export const REQUEST_SW_PLANETS_FAILURE = 'REQUEST_SW_PLANETS_FAILURE';
export const FILTER_PLANETS = 'FILTER_PLANETS';
export const ADD_FILTERS = 'ADD_FILTERS';


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

const addFilters = (column, comparison, value) => ({
  type: ADD_FILTERS,
  filters: [{ numeric_values: { column, comparison, value } }],
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

export function filterButton() {
  const planetsFilter = JSON.parse(sessionStorage.getItem('filters')) || '';
  const planetsCompare = JSON.parse(sessionStorage.getItem('compare')) || '';
  const planetsValue = parseInt(JSON.parse(sessionStorage.getItem('value')), 10) || 0;

  sessionStorage.removeItem('filters');
  sessionStorage.removeItem('compare');
  sessionStorage.removeItem('value');

  return (dispatch) => (
    dispatch(addFilters(planetsFilter, planetsCompare, planetsValue))
  );
}

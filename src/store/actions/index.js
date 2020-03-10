import getCurrentSwPlanets from '../../services/swAPI';

export const REQUEST_SW_PLANETS = 'REQUEST_SW_PLANETS';
export const REQUEST_SW_PLANETS_SUCCESS = 'REQUEST_SW_PLANETS_SUCCESS';
export const REQUEST_SW_PLANETS_FAILURE = 'REQUEST_SW_PLANETS_FAILURE';
export const FILTER_PLANETS = 'FILTER_PLANETS';
export const OTHER_FILTERS = 'OTHER_FILTERS';

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

const receiveFilterNamePlanets = (results, name) => (
  {
    type: FILTER_PLANETS,
    filters: [{ name }],
    results,
  }
);

const receiveOtherFilters = (results, column, comparison, value) => ({
  type: OTHER_FILTERS,
  filters: [{ numeric_values: { column, comparison, value } }],
  results,
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

export function filterPlanets({ target: { value } }) {
  const planets = JSON.parse(sessionStorage.getItem('planets'));

  return (dispatch) => (
    dispatch(receiveFilterNamePlanets(planets, new RegExp(value, 'i')))
  );
}

export function filterOther({ target: { value } }, i) {
  if (i === 0) sessionStorage.setItem('filters', JSON.stringify(value));
  if (i === 1) sessionStorage.setItem('compare', JSON.stringify(value));
  if (i === 2) sessionStorage.setItem('value', JSON.stringify(value));
  const planets = JSON.parse(sessionStorage.getItem('planets')) || '';
  const planetsFilter = JSON.parse(sessionStorage.getItem('filters')) || '';
  const planetsCompare = JSON.parse(sessionStorage.getItem('compare')) || '';
  const planetsValue = JSON.parse(sessionStorage.getItem('value')) || '';

  return (dispatch) => (
    dispatch(receiveOtherFilters(planets, planetsFilter, planetsCompare, planetsValue))
  );
}

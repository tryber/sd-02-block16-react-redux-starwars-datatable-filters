import { getSWPlanets } from '../services/swAPI';

export const RECEIVE_SW_PLANETS = 'RECEIVE_SW_PLANETS';
export const SHOW_SW_PLANETS = 'SHOW_SW_PLANETS';
export const ERROR_SW_PLANETS = 'ERROR_SW_PLANETS';
export const FILTER_SW_PLANETS = 'FILTER_SW_PLANETS';
export const FILTER_SW_NUMBER = 'FILTER_SW_NUMBER';


export const receiveSWPlanets = () => (
  { type: RECEIVE_SW_PLANETS, loading: true }
);

export const showSWPlanets = ({ results }) => (
  { type: SHOW_SW_PLANETS, planets: results }
);
export const errorSWPlanets = (error) => (
  { type: ERROR_SW_PLANETS, error }
);
export const filterSWPlanets = (typing, data) => (
  {
    type: FILTER_SW_PLANETS,
    typing,
    results: data.some((planet) => planet.name.toLowerCase().includes(typing))
      ? data.filter((planet) => planet.name.toLowerCase().includes(typing)) : null,
  }
);

export const filterSWNumber = (typeSelect, value) => ({
  type: FILTER_SW_NUMBER,
  numeric_values: {
    [typeSelect]: value,
  },
});

export function fetchSWPlanets() {
  return (dispatch) => {
    dispatch(receiveSWPlanets());
    return getSWPlanets()
      .then(
        (planet) => dispatch(showSWPlanets(planet)),
        (error) => dispatch(errorSWPlanets(error.message)),
      );
  };
}

export const filterByColumn = (typeSelect, value) => {
  console.log(typeSelect);
  return (dispatch) => (
    dispatch(filterSWNumber(typeSelect, value))
  );
};

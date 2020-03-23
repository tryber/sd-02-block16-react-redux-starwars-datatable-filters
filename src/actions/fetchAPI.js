import { REQUEST_PLANETS, RECEIVE_PLANETS } from '../reducers/dataReducer';

const requestPlanets = () => ({
  type: REQUEST_PLANETS,
});

const receivePlanets = (planets) => ({
  type: RECEIVE_PLANETS,
  planets,
});

const fetchAPI = () => (
  (dispatch) => {
    dispatch(requestPlanets());
    return (
      fetch('https://swapi.co/api/planets')
        .then((response) => response.json())
        .then((data) => {
          dispatch(receivePlanets(data.results));
        })
    );
  }
);

export default fetchAPI;

const planetsApi = 'https://swapi-trybe.herokuapp.com/api/planets';

const getCurrentSWPlanets = () => (
  fetch(`${planetsApi}`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getCurrentSWPlanets;

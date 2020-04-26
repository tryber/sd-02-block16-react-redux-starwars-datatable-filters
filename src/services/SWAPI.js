const trybeAPI = 'https://swapi-trybe.herokuapp.com/api';

const getPlanets = () => (
  fetch(`${trybeAPI}/planets`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getPlanets;
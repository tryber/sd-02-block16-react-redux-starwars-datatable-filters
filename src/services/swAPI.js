/* eslint-disable import/prefer-default-export */
const APIURL = 'https://swapi.co/api/planets/';

export const getSWPlanets = () => (
  fetch(`${APIURL}`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

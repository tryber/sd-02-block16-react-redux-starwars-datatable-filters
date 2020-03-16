export const SWAPI = 'https://swapi.co/api/planets';

export const planetsData = () => (
  fetch(SWAPI)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);
